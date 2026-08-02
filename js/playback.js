// 取经动态卷轴播放组件
// 功能：主路径渐进绘制 + 取经队标记行进 + 逐节点点亮 + 悟空战斗轨迹（红色虚线同步揭示 + 爆裂动画）
(function () {
    'use strict';

    var TOGGLE_ID = 'playback-toggle';
    var BAR_ID = 'playback-bar';
    var PLAY_BTN_ID = 'playback-play';
    var LABEL_ID = 'playback-label';
    var FILL_ID = 'playback-fill';
    var FOLLOW_ID = 'playback-follow';

    function Playback(opts) {
        this.data = opts.data || [];
        this.svg = opts.svg;            // d3 选择 #journey-map
        this.mapGroup = opts.mapGroup;  // d3 选择 #map
        this.pathMain = opts.pathMain;  // d3 选择 .path-main
        this.pathPulse = opts.pathPulse;// d3 选择 .path-pulse
        this.nodes = opts.nodes;        // d3 选择 .location-node
        this.centerFn = opts.centerFn;  // (viewBoxPoint) => 平移视图居中
        this.onVisit = opts.onVisit;    // (loc) => 到达节点时回调（自动弹窗等）

        this.playing = false;
        this.speed = 1;
        this.follow = true;
        this.progress = 0;
        this._startProg = 0;
        this._timer = null;
        this._duration = 36;            // 1x 全程秒数
        this.totalLen = 0;
        this.nodeProg = [];
        this.currentIdx = -1;

        this._build();
        this._initMetrics();
        this._createLayers();
    }

    // =============================================
    // 构建 DOM（header 按钮 + 底部控制条）
    // =============================================
    Playback.prototype._build = function () {
        var toggle = document.createElement('button');
        toggle.id = TOGGLE_ID;
        toggle.className = 'playback-toggle';
        toggle.innerHTML = '🎬 <span class="playback-toggle-text">取经回放</span>';
        toggle.title = '动态卷轴播放取经全程';
        toggle.addEventListener('click', function () { this.toggle(); }.bind(this));
        var headerInner = document.querySelector('.header-inner');
        if (headerInner) headerInner.appendChild(toggle);

        var bar = document.createElement('div');
        bar.id = BAR_ID;
        bar.className = 'playback-bar';

        this.playBtn = document.createElement('button');
        this.playBtn.id = PLAY_BTN_ID;
        this.playBtn.className = 'playback-btn playback-play';
        this.playBtn.textContent = '▶';
        this.playBtn.addEventListener('click', function () { this.toggle(); }.bind(this));

        var prog = document.createElement('div');
        prog.className = 'playback-progress';
        this.label = document.createElement('span');
        this.label.id = LABEL_ID;
        this.label.className = 'playback-label';
        this.label.textContent = '第 1 / ' + this.data.length + ' 站 · ' + (this.data[0] ? this.data[0].name : '');
        var track = document.createElement('div');
        track.className = 'playback-track';
        this.fill = document.createElement('div');
        this.fill.id = FILL_ID;
        this.fill.className = 'playback-fill';
        track.appendChild(this.fill);
        prog.appendChild(this.label);
        prog.appendChild(track);

        var speeds = document.createElement('div');
        speeds.className = 'playback-speeds';
        [1, 2, 4].forEach(function (s) {
            var b = document.createElement('button');
            b.className = 'playback-speed' + (s === 1 ? ' active' : '');
            b.textContent = s + 'x';
            b.addEventListener('click', function () { this.setSpeed(s, b); }.bind(this));
            speeds.appendChild(b);
        }.bind(this));

        this.followBtn = document.createElement('button');
        this.followBtn.id = FOLLOW_ID;
        this.followBtn.className = 'playback-btn playback-follow active';
        this.followBtn.textContent = '🎯';
        this.followBtn.title = '跟随标记平移视图';
        this.followBtn.addEventListener('click', function () { this.toggleFollow(); }.bind(this));

        var closeBtn = document.createElement('button');
        closeBtn.className = 'playback-btn playback-close';
        closeBtn.textContent = '✕';
        closeBtn.title = '关闭回放';
        closeBtn.addEventListener('click', function () { this.close(); }.bind(this));

        bar.appendChild(this.playBtn);
        bar.appendChild(prog);
        bar.appendChild(speeds);
        bar.appendChild(this.followBtn);
        bar.appendChild(closeBtn);
        document.body.appendChild(bar);

        this.bar = bar;
    };

    // =============================================
    // 初始化路径度量（总长 + 节点进度）
    // =============================================
    Playback.prototype._initMetrics = function () {
        var pathNode = this.pathMain.node();
        if (!pathNode || typeof pathNode.getTotalLength !== 'function') return;
        this.totalLen = pathNode.getTotalLength();

        // 节点沿折线的累计距离占比（近似曲线进度）
        var pts = this.data.map(function (d) { return d.position; });
        var total = 0;
        var acc = [0];
        for (var i = 1; i < pts.length; i++) {
            total += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
            acc.push(total);
        }
        this.nodeProg = total > 0 ? acc.map(function (a) { return a / total; }) : this.data.map(function () { return 0; });
    };

    // =============================================
    // 创建图层：标记 + 战斗爆裂层
    // =============================================
    Playback.prototype._createLayers = function () {
        // 取经队标记（金色圆 + 光晕）
        var g = this.mapGroup.append('g').attr('class', 'playback-marker').style('display', 'none');
        g.append('circle').attr('class', 'playback-marker-halo').attr('r', 14);
        g.append('circle').attr('class', 'playback-marker-dot').attr('r', 7);
        this.marker = g;

        // 战斗爆裂层
        this.burstLayer = this.mapGroup.append('g').attr('class', 'playback-bursts');
        this.battleTrail = this.mapGroup.append('path').attr('class', 'battle-trail').style('display', 'none');
    };

    // =============================================
    // 播放 / 暂停 / 切换
    // =============================================
    Playback.prototype.play = function () {
        if (this.playing) return;
        if (this.progress >= 1) { this.progress = 0; this._startProg = 0; }
        this.playing = true;
        this._beginVisuals();
        this._updatePlayBtn();

        var self = this;
        this._timer = d3.timer(function (elapsed) {
            var t = elapsed / 1000 * self.speed;
            self.progress = Math.min(1, self._startProg + t / self._duration);
            self._draw();
            if (self.progress >= 1) self._finish();
        });
    };

    Playback.prototype.pause = function () {
        if (!this.playing) return;
        if (this._timer) this._timer.stop();
        this._timer = null;
        this.playing = false;
        this._startProg = this.progress;
        this._updatePlayBtn();
    };

    Playback.prototype.toggle = function () {
        if (!this.bar.classList.contains('show')) {
            this.bar.classList.add('show');
            this.play();
            return;
        }
        if (this.playing) this.pause();
        else this.play();
    };

    Playback.prototype.close = function () {
        this.pause();
        this.bar.classList.remove('show');
        this._resetVisuals();
    };

    Playback.prototype._finish = function () {
        this.playing = false;
        if (this._timer) this._timer.stop();
        this._timer = null;
        this._stopPulse();
        this._updatePlayBtn();
    };

    Playback.prototype.setSpeed = function (s, btn) {
        this.speed = s;
        var self = this;
        this.bar.querySelectorAll('.playback-speed').forEach(function (b) {
            b.classList.toggle('active', b === btn);
        });
    };

    Playback.prototype.toggleFollow = function () {
        this.follow = !this.follow;
        this.followBtn.classList.toggle('active', this.follow);
    };

    // =============================================
    // 开始可视化（路径绘制初始 + 战斗轨迹揭示）
    // =============================================
    Playback.prototype._beginVisuals = function () {
        var self = this;
        // 主路径渐进绘制
        this.pathMain
            .attr('stroke-dasharray', this.totalLen + ' ' + this.totalLen)
            .attr('stroke-dashoffset', (1 - this.progress) * this.totalLen);
        // 弱化流动虚线避免干扰
        this.pathPulse.attr('opacity', 0.12);

        // 战斗轨迹（红色虚线，与进度同步揭示）
        var pts = this.data.map(function (d) { return [d.position.x, d.position.y]; });
        var lineGen = d3.line().curve(d3.curveCatmullRom.alpha(0.5));
        this.battleTrail
            .style('display', '')
            .attr('d', lineGen(pts))
            .attr('stroke-dasharray', this.totalLen + ' ' + this.totalLen)
            .attr('stroke-dashoffset', (1 - this.progress) * this.totalLen);

        // 妖怪节点标记为战斗位
        this.nodes.each(function (d) {
            d3.select(this).classed('has-battle', !!(d.demons && d.demons.length > 0));
        });

        this.marker.style('display', '');
        this._draw();
    };

    // =============================================
    // 逐帧绘制
    // =============================================
    Playback.prototype._draw = function () {
        var p = this.progress;
        var self = this;

        // 路径揭示
        this.pathMain.attr('stroke-dashoffset', (1 - p) * this.totalLen);
        this.battleTrail.attr('stroke-dashoffset', (1 - p) * this.totalLen);

        // 标记沿路径行进
        var pathNode = this.pathMain.node();
        if (pathNode && typeof pathNode.getPointAtLength === 'function') {
            var pt = pathNode.getPointAtLength(p * this.totalLen);
            this.marker.attr('transform', 'translate(' + pt.x + ',' + pt.y + ')');
        }

        // 进度条
        this.fill.style.width = (p * 100) + '%';

        // 节点点亮
        var idx = this._indexAt(p);
        if (idx !== this.currentIdx) {
            this.currentIdx = idx;
            this.nodes.classed('played', function (d, i) { return i <= idx; });
            this.nodes.classed('current', function (d, i) { return i === idx; });

            var cur = this.data[idx];
            if (cur) {
                this.label.textContent = '第 ' + (idx + 1) + ' / ' + this.data.length + ' 站 · ' + cur.name;
                if (cur.demons && cur.demons.length > 0) this._burst(cur);
                // 到达节点自动弹出详情
                if (this.onVisit) this.onVisit(cur);
                this._stopPulse();
                this._pulse();
                if (this.follow && this.centerFn) this.centerFn(cur.position);
            }
        }
    };

    // =============================================
    // 战斗爆裂（悟空战斗轨迹动画）
    // 用 d3.transition 驱动 r 动画（CSS 动画无法驱动 SVG 几何属性 r）
    // =============================================
    Playback.prototype._burst = function (d) {
        var circle = this.burstLayer.append('circle')
            .attr('class', 'battle-burst')
            .attr('cx', d.position.x)
            .attr('cy', d.position.y)
            .attr('r', 6)
            .attr('fill', 'none')
            .attr('stroke', '#d93b4a')
            .attr('stroke-width', 2);

        // 半径从 6 扩张到 34 并淡出；结束后自动删除自身
        circle.transition()
            .duration(900)
            .ease(d3.easeCubicOut)
            .attr('r', 34)
            .attr('stroke-opacity', 0)
            .on('end', function () { circle.remove(); });
    };

    // =============================================
    // 复位可视化
    // =============================================
    Playback.prototype._resetVisuals = function () {
        this._stopPulse();
        this.progress = 0;
        this._startProg = 0;
        this.currentIdx = -1;
        this.pathMain.attr('stroke-dasharray', null).attr('stroke-dashoffset', null);
        this.pathPulse.attr('opacity', 0.55);
        this.battleTrail.style('display', 'none');
        this.marker.style('display', 'none');
        this.burstLayer.selectAll('*').remove();
        this.nodes.classed('played', false).classed('current', false).classed('has-battle', false);
        this.fill.style.width = '0%';
        if (this.data[0]) {
            this.label.textContent = '第 1 / ' + this.data.length + ' 站 · ' + this.data[0].name;
        }
    };

    Playback.prototype._updatePlayBtn = function () {
        this.playBtn.textContent = this.playing ? '⏸' : '▶';
    };

    // 当前节点脉动（JS 驱动，替代 CSS transform 动画对 SVG 的不稳支持）
    // 用 _pulseToken 版本号做失效标记：_stopPulse 递增 token，
    // 使所有进行中的递归脉动在下一次迭代时自检退出，彻底停止
    Playback.prototype._pulse = function () {
        var self = this;
        var token = this._pulseToken;
        // 未播放 / 已被 _stopPulse 失效 → 直接退出
        if (!this.playing) return;

        var circle = this.mapGroup.select('.location-node.current .node-circle');
        // 当前节点不存在（播放中节点切换的间隙）→ 短暂重试，但受 token/playing 双重约束
        if (circle.empty()) {
            if (token !== this._pulseToken) return;
            this._pulseTimer = setTimeout(function () { self._pulse(); }, 120);
            return;
        }

        var base = circle.attr('r');
        circle.transition()
            .duration(600).ease(d3.easeQuadOut)
            .attr('r', base * 1.35)
            .transition()
            .duration(600).ease(d3.easeQuadIn)
            .attr('r', base)
            .on('end', function () {
                // 若已被停止或 token 过期，不再续循环
                if (token !== self._pulseToken) return;
                if (!self.playing) return;
                self._pulseTimer = setTimeout(function () { self._pulse(); }, 80);
            });
    };

    Playback.prototype._stopPulse = function () {
        // 递增 token 使所有进行中的脉动链失效
        this._pulseToken = (this._pulseToken || 0) + 1;
        if (this._pulseTimer) { clearTimeout(this._pulseTimer); this._pulseTimer = null; }
        var circle = this.mapGroup.select('.location-node.current .node-circle');
        if (!circle.empty()) circle.interrupt();
    };

    Playback.prototype._indexAt = function (p) {
        var idx = 0;
        for (var i = 0; i < this.nodeProg.length; i++) {
            if (this.nodeProg[i] <= p) idx = i;
        }
        return idx;
    };

    // 暴露构造函数（由 main.js 注入真实 SVG 引用后实例化）
    window.Playback = Playback;
})();
