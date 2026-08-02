// 八十一难时间轴组件 - 深色水墨主题
// 依据第 99 回观音所念八十一难名单，右侧滑出面板，支持与地图节点双向联动
(function () {
    'use strict';

    var PANEL_ID = 'difficulty-panel';
    var TOGGLE_ID = 'difficulty-toggle';
    var LIST_ID = 'difficulty-list';
    var PROGRESS_ID = 'difficulty-progress';
    var TOAST_ID = 'difficulty-toast';

    // 预置：起始/终成正果里程碑
    var MILESTONES = { 1: '出 发', 81: '成 正 果' };

    function Timeline() {
        this.data = [];
        this.list = null;
        this.items = []; // { entry, el }
        this.activeId = null;
        this.activeLocId = null;
        this.onSelect = null; // (difficulty) => void
        this.panel = null;
        this.openState = false;
    }

    // =============================================
    // 构建 DOM（面板 + 触发器 + toast，全部由组件创建）
    // =============================================
    Timeline.prototype._build = function () {
        // 触发器按钮（挂在 header-inner 右侧，与标题同排）
        var toggle = document.createElement('button');
        toggle.id = TOGGLE_ID;
        toggle.className = 'difficulty-toggle';
        toggle.innerHTML = '📜 <span class="difficulty-toggle-text">八十一难</span>';
        toggle.title = '查看八十一难时间轴';
        toggle.addEventListener('click', function () { this.toggle(); }.bind(this));
        var headerInner = document.querySelector('.header-inner');
        if (headerInner) headerInner.appendChild(toggle);

        // 右侧滑出面板
        var panel = document.createElement('div');
        panel.id = PANEL_ID;
        panel.className = 'difficulty-panel';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-label', '八十一难时间轴');

        var headerBar = document.createElement('div');
        headerBar.className = 'difficulty-panel-header';
        headerBar.innerHTML =
            '<h3 class="difficulty-panel-title">📜 八十一难</h3>' +
            '<span class="difficulty-panel-sub">九九归真 · 功德圆满</span>' +
            '<button class="difficulty-panel-close" aria-label="关闭">✕</button>';
        headerBar.querySelector('.difficulty-panel-close')
            .addEventListener('click', function () { this.close(); }.bind(this));
        panel.appendChild(headerBar);

        // 进度条（当前第几难）
        var progress = document.createElement('div');
        progress.className = 'difficulty-progress';
        progress.innerHTML =
            '<span class="difficulty-progress-label" id="' + PROGRESS_ID + '-label">尚未开始</span>' +
            '<div class="difficulty-progress-track"><div class="difficulty-progress-fill" id="' + PROGRESS_ID + '"></div></div>';
        panel.appendChild(progress);

        // 条目列表
        var list = document.createElement('div');
        list.className = 'difficulty-list';
        list.id = LIST_ID;
        panel.appendChild(list);

        // 遮罩（点击关闭）
        var overlay = document.createElement('div');
        overlay.className = 'difficulty-overlay';
        overlay.addEventListener('click', function () { this.close(); }.bind(this));
        document.body.appendChild(overlay);

        document.body.appendChild(panel);

        // toast（无对应地点的提示）
        var toast = document.createElement('div');
        toast.id = TOAST_ID;
        toast.className = 'difficulty-toast';
        document.body.appendChild(toast);

        this.panel = panel;
        this.list = list;
        this.overlay = overlay;
        this.toast = toast;
        this.progressFill = panel.querySelector('#difficulty-progress');
        this.progressLabel = panel.querySelector('#difficulty-progress-label');

        // ESC 关闭
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && this.openState) this.close();
        }.bind(this));
    };

    // =============================================
    // 渲染条目
    // =============================================
    Timeline.prototype._render = function () {
        var frag = document.createDocumentFragment();
        this.items = [];
        var self = this;

        this.data.forEach(function (diff) {
            var entry = document.createElement('div');
            entry.className = 'difficulty-entry';

            var hasLoc = diff.locationId !== null && diff.locationId !== undefined;

            entry.innerHTML =
                '<span class="difficulty-entry-dot" style="' + (hasLoc ? 'background:' + dotColor(diff) + ';' : '') + '"></span>' +
                '<span class="difficulty-entry-label">' +
                '  <span class="difficulty-entry-no">' + pad(diff.id) + '</span>' +
                '  <span class="difficulty-entry-name">' + diff.name + '</span>' +
                '  <span class="difficulty-entry-desc">' + diff.desc + '</span>' +
                (hasLoc ? '<span class="difficulty-entry-loc">📍 ' + locName(diff) + '</span>' : '') +
                '</span>';

            entry.addEventListener('click', function () {
                self.activeId = diff.id;
                self._markActive();
                if (self.onSelect) self.onSelect(diff);
            });

            frag.appendChild(entry);
            self.items.push({ entry: entry, data: diff });
        });

        this.list.appendChild(frag);
        this._markActive();
    };

    // =============================================
    // 标记当前激活（高亮 + 进度条）
    // =============================================
    Timeline.prototype._markActive = function () {
        var self = this;
        this.items.forEach(function (item) {
            item.entry.classList.toggle('active', item.data.id === self.activeId);
        });
        if (this.activeId) {
            var pct = Math.round(this.activeId / this.data.length * 100);
            this.progressFill.style.width = pct + '%';
            this.progressLabel.textContent = '第 ' + this.activeId + ' / 81 难 · ' + nameOf(this.activeId);
        }
    };

    // =============================================
    // 聚焦：按难度 id 滚动到该条并高亮
    // =============================================
    Timeline.prototype.focusDifficulty = function (id) {
        this.activeId = id;
        this._markActive();
        var item = this.items.filter(function (i) { return i.data.id === id; })[0];
        if (item) {
            item.entry.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    // 聚焦：按地图节点 locationId，找出对应难度并聚焦；无对应则提示
    Timeline.prototype.focusLocation = function (locId) {
        var hits = this.data.filter(function (d) { return d.locationId === locId; });
        if (hits.length === 0) {
            this._toast('该地点不在八十一难名单内（如妖怪路线串联地）');
            return;
        }
        this.activeLocId = locId;
        // 高亮所有对应条目
        this.items.forEach(function (item) {
            var match = item.data.locationId === locId;
            item.entry.classList.toggle('loc-linked', match);
        });
        // 聚焦第一个对应难度
        this.focusDifficulty(hits[0].id);
        this._toast('关联 ' + hits.length + ' 难');
    };

    // =============================================
    // 打开 / 关闭 / 切换
    // =============================================
    Timeline.prototype.open = function () {
        this.openState = true;
        this.panel.classList.add('open');
        this.overlay.classList.add('show');
    };

    Timeline.prototype.close = function () {
        this.openState = false;
        this.panel.classList.remove('open');
        this.overlay.classList.remove('show');
    };

    Timeline.prototype.toggle = function () {
        if (this.openState) this.close();
        else this.open();
    };

    // =============================================
    // 内部工具
    // =============================================
    Timeline.prototype._toast = function (msg) {
        this.toast.textContent = msg;
        this.toast.classList.add('show');
        clearTimeout(this._toastTimer);
        this._toastTimer = setTimeout(function () {
            this.toast.classList.remove('show');
        }.bind(this), 1600);
    };

    // 初始化：注入数据并构建
    Timeline.prototype.init = function (data) {
        if (typeof window.difficulties === 'undefined') {
            console.error('difficulties 未加载！');
            return;
        }
        this.data = window.difficulties;
        this._build();
        this._render();
    };

    // =============================================
    // 模块级工具函数
    // =============================================
    function pad(n) {
        return (n < 10 ? '0' : '') + n;
    }

    function nameOf(id) {
        var d = window.difficulties.filter(function (x) { return x.id === id; })[0];
        return d ? d.name : '';
    }

    function dotColor(d) {
        // 有对应地点的难度用金色，里程碑用亮金色
        if (d.id === 1 || d.id === 81) return '#FFD700';
        return '#c9a15a';
    }

    function locName(d) {
        var loc = (window.journeyData || []).filter(function (x) { return x.id === d.locationId; })[0];
        return loc ? loc.name : ('地点#' + d.locationId);
    }

    // 暴露到全局（仿 tooltip.js 模式）
    window.timeline = new Timeline();
})();
