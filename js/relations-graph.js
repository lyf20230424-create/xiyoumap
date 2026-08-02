// 妖魔族谱关系图组件 - d3-force 力导向图
// 揭示西游暗线：妖怪多系神佛坐骑/童子/亲属下凡，最后由主人收服
(function () {
    'use strict';

    var MODAL_ID = 'relation-modal';
    var TOGGLE_ID = 'relation-toggle';
    var SVG_ID = 'relation-svg';
    var CLOSE_ID = 'relation-close';

    // 节点颜色（按 kind）
    var KIND_COLOR = {
        '师徒': '#E8A84B',
        '佛':   '#FFD700',
        '仙':   '#E8A84B',
        '妖怪': '#D9585E',
        '野生': '#8A8A8A'
    };

    // 连边颜色（按 kind）
    var LINK_COLOR = {
        '出身': 'rgba(201,161,90,0.7)',
        '亲属': 'rgba(63,165,107,0.7)',
        '降服': 'rgba(217,88,94,0.7)',
        '贬谪': 'rgba(140,106,60,0.7)',
        '师徒': 'rgba(232,168,75,0.7)'
    };

    var KIND_LABEL = {
        '师徒': '取经师徒',
        '佛':   '神佛',
        '仙':   '仙人',
        '妖怪': '有背景妖怪',
        '野生': '野生妖魔'
    };

    function RelationsGraph() {
        this.nodes = [];
        this.links = [];
        this.onSelect = null; // (node) => void
        this.svg = null;
        this.simulation = null;
    }

    // =============================================
    // 构建 DOM
    // =============================================
    RelationsGraph.prototype._build = function () {
        // 触发器（挂在 header-inner）
        var toggle = document.createElement('button');
        toggle.id = TOGGLE_ID;
        toggle.className = 'relation-toggle';
        toggle.innerHTML = '🧬 <span class="relation-toggle-text">妖魔族谱</span>';
        toggle.title = '妖怪与神佛的关系网络';
        toggle.addEventListener('click', function () { this.open(); }.bind(this));
        var headerInner = document.querySelector('.header-inner');
        if (headerInner) headerInner.appendChild(toggle);

        // 居中弹窗
        var modal = document.createElement('div');
        modal.id = MODAL_ID;
        modal.className = 'relation-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-label', '妖魔族谱关系图');

        var content = document.createElement('div');
        content.className = 'relation-content';
        content.innerHTML =
            '<button id="' + CLOSE_ID + '" class="relation-close" aria-label="关闭">✕</button>' +
            '<div class="relation-header">' +
            '  <h3 class="relation-title">🧬 妖魔族谱</h3>' +
            '  <span class="relation-sub">妖怪皆由神佛而来 · 缘起缘灭</span>' +
            '</div>' +
            '<div class="relation-legend">' +
            '  <span class="relation-legend-item"><i style="background:#FFD700"></i>神佛</span>' +
            '  <span class="relation-legend-item"><i style="background:#E8A84B"></i>仙人 / 师徒</span>' +
            '  <span class="relation-legend-item"><i style="background:#D9585E"></i>有背景妖怪</span>' +
            '  <span class="relation-legend-item"><i style="background:#8A8A8A"></i>野生妖魔</span>' +
            '</div>' +
            '<div class="relation-hint">点按节点可跳转地图 · 拖动节点查看关系</div>' +
            '<svg id="' + SVG_ID + '" class="relation-svg"></svg>';

        modal.appendChild(content);

        // 遮罩点击关闭
        modal.addEventListener('click', function (e) {
            if (e.target === modal) this.close();
        }.bind(this));

        document.body.appendChild(modal);
        this.modal = modal;
        this.svgEl = modal.querySelector('#' + SVG_ID);
        modal.querySelector('#' + CLOSE_ID).addEventListener('click', function () { this.close(); }.bind(this));

        // ESC 关闭
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && this.isOpen()) this.close();
        }.bind(this));
    };

    // =============================================
    // 渲染力导向图
    // =============================================
    RelationsGraph.prototype._render = function () {
        var svgEl = this.svgEl;
        var w = svgEl.clientWidth || 720;
        var h = svgEl.clientHeight || 460;

        var svg = d3.select(svgEl);
        svg.selectAll('*').remove();
        this.svg = svg;

        var links = this.links.map(function (l) {
            return {
                source: l.source,
                target: l.target,
                label: l.label,
                kind: l.kind
            };
        });

        // 图例连接线示例
        var self = this;
        var linkGroup = svg.append('g').attr('class', 'relation-links');
        var nodeGroup = svg.append('g').attr('class', 'relation-nodes');
        var labelGroup = svg.append('g').attr('class', 'relation-labels');

        var linkEl = linkGroup.selectAll('line')
            .data(links)
            .enter().append('line')
            .attr('class', 'relation-link')
            .attr('stroke', function (d) { return LINK_COLOR[d.kind] || '#5a4426'; })
            .attr('stroke-width', 1.5);

        var linkLabelEl = linkGroup.selectAll('text')
            .data(links)
            .enter().append('text')
            .attr('class', 'relation-link-label')
            .attr('text-anchor', 'middle')
            .attr('font-size', 9)
            .text(function (d) { return d.label; });

        var nodeEl = nodeGroup.selectAll('g')
            .data(this.nodes)
            .enter().append('g')
            .attr('class', 'relation-node')
            .call(this._drag(svg));

        nodeEl.append('circle')
            .attr('r', function (d) {
                var deg = self._degree(d.id);
                return Math.min(9 + deg * 1.6, 24);
            })
            .attr('fill', function (d) { return KIND_COLOR[d.kind] || '#888'; })
            .attr('stroke', '#271c12')
            .attr('stroke-width', 1.5)
            .style('cursor', 'pointer')
            .on('click', function (event, d) {
                if (d.locationId && self.onSelect) self.onSelect(d);
            })
            .on('mouseover', function (event, d) {
                tooltipOf(self).show(event, tooltipHtml(d));
            })
            .on('mouseout', function () {
                tooltipOf(self).hide();
            });

        nodeEl.append('text')
            .attr('class', 'relation-node-name')
            .attr('text-anchor', 'middle')
            .attr('dy', function (d) {
                var deg = self._degree(d.id);
                return Math.min(9 + deg * 1.6, 24) + 12;
            })
            .attr('font-size', 10)
            .text(function (d) { return d.id; });

        // 力导向
        this.simulation = d3.forceSimulation(this.nodes)
            .force('link', d3.forceLink(links).id(function (d) { return d.id; }).distance(90).strength(0.6))
            .force('charge', d3.forceManyBody().strength(-260))
            .force('center', d3.forceCenter(w / 2, h / 2))
            .force('collide', d3.forceCollide(26))
            .on('tick', function () {
                linkEl
                    .attr('x1', function (d) { return d.source.x; })
                    .attr('y1', function (d) { return d.source.y; })
                    .attr('x2', function (d) { return d.target.x; })
                    .attr('y2', function (d) { return d.target.y; });
                linkLabelEl
                    .attr('x', function (d) { return (d.source.x + d.target.x) / 2; })
                    .attr('y', function (d) { return (d.source.y + d.target.y) / 2 - 4; });
                nodeEl.attr('transform', function (d) {
                    return 'translate(' + d.x + ',' + d.y + ')';
                });
            });

        // 缩放
        svg.call(d3.zoom()
            .scaleExtent([0.3, 4])
            .on('zoom', function (event) {
                linkGroup.attr('transform', event.transform);
                nodeGroup.attr('transform', event.transform);
                labelGroup.attr('transform', event.transform);
            }));

        // 停止自动运动，避免持续抖
        setTimeout(function () { if (self.simulation) self.simulation.alphaTarget(0.1); }, 1200);
    };

    // =============================================
    // 拖拽
    // =============================================
    RelationsGraph.prototype._drag = function (svg) {
        var self = this;
        return d3.drag()
            .on('start', function (event, d) {
                var sim = self.simulation;
                if (!event.active && sim) sim.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            })
            .on('drag', function (event, d) {
                d.fx = event.x;
                d.fy = event.y;
            })
            .on('end', function (event, d) {
                var sim = self.simulation;
                if (!event.active && sim) sim.alphaTarget(0.1);
                d.fx = null;
                d.fy = null;
            });
    };

    // =============================================
    // 工具
    // =============================================
    RelationsGraph.prototype._degree = function (id) {
        var n = 0;
        this.links.forEach(function (l) {
            var s = typeof l.source === 'object' ? l.source.id : l.source;
            var t = typeof l.target === 'object' ? l.target.id : l.target;
            if (s === id || t === id) n++;
        });
        return n;
    };

    // 打开 / 关闭
    RelationsGraph.prototype.open = function () {
        this.modal.classList.add('open');
        // 若容器尺寸变化则重排
        this._restart();
    };

    RelationsGraph.prototype.close = function () {
        this.modal.classList.remove('open');
    };

    RelationsGraph.prototype.isOpen = function () {
        return this.modal.classList.contains('open');
    };

    RelationsGraph.prototype._restart = function () {
        if (this.simulation) {
            var svgEl = this.svgEl;
            var w = svgEl.clientWidth || 720;
            var h = svgEl.clientHeight || 460;
            this.simulation.force('center', d3.forceCenter(w / 2, h / 2));
            this.simulation.alpha(0.4).restart();
        }
    };

    // 初始化
    RelationsGraph.prototype.init = function () {
        if (typeof window.relationNodes === 'undefined' || typeof window.relationLinks === 'undefined') {
            console.error('relations 数据未加载！');
            return;
        }
        this.nodes = window.relationNodes;
        this.links = window.relationLinks;
        this._build();
        this._render();
    };

    // =============================================
    // 模块级工具函数
    // =============================================
    function tooltipOf(self) {
        if (typeof window.tooltip !== 'undefined') return window.tooltip;
        return { show: function () {}, hide: function () {} };
    }

    function tooltipHtml(d) {
        return '<strong>' + d.id + '</strong>' +
            (d.note ? '<br/>' + d.note : '') +
            (d.locationId ? '<br/><span style="color:#3FA56B">📍 点击跳转地图</span>' : '');
    }

    // 暴露到全局
    window.relationsGraph = new RelationsGraph();
})();
