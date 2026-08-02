// 主逻辑 - D3.js 西游记取经路线地图可视化
// 深色水墨主题 + 贝塞尔路线 + 右侧详情面板

(function() {
    'use strict';

    function init() {
        if (typeof window.journeyData === 'undefined') {
            console.error('journeyData 未加载！');
            return;
        }
        if (typeof window.tooltip === 'undefined') {
            console.error('tooltip 未加载！');
            return;
        }
        if (typeof d3 === 'undefined') {
            console.error('d3 未加载！');
            return;
        }

        console.log('journeyData length:', window.journeyData.length);

        function setupMap() {
            var journeyData = window.journeyData;
            var tooltipInstance = window.tooltip;

            // =============================================
            // SVG 容器
            // =============================================
            var svgEl = document.getElementById("journey-map");
            if (!svgEl) {
                console.error("SVG element #journey-map not found!");
                return;
            }

            var svg = d3.select("#journey-map");
            var mapGroup = svg.select("#map");
            var pathsGroup = mapGroup.select("#paths");
            var nodesGroup = mapGroup.select("#nodes");

            if (pathsGroup.empty() || nodesGroup.empty()) {
                console.error("Required SVG groups not found!");
                return;
            }

            console.log('SVG ready — paths:', !pathsGroup.empty(), 'nodes:', !nodesGroup.empty());

            // =============================================
            // 缩放
            // =============================================
            var zoom = d3.zoom()
                .scaleExtent([0.5, 3])
                .on("zoom", function(event) {
                    mapGroup.attr("transform", event.transform);
                });

            svg.call(zoom);

            // =============================================
            // 路径 — 贝塞尔曲线（水墨山川起伏感）
            // =============================================
            var pathPoints = journeyData.map(function(d) {
                return [d.position.x, d.position.y];
            });

            // 平滑曲线，营造山川起伏
            var lineGenerator = d3.line()
                .curve(d3.curveCatmullRom.alpha(0.5));

            // 发光底层
            pathsGroup.append("path")
                .datum(pathPoints)
                .attr("class", "path path-glow")
                .attr("d", lineGenerator);

            // 主路径
            pathsGroup.append("path")
                .datum(pathPoints)
                .attr("class", "path path-main")
                .attr("d", lineGenerator);

            // 流动虚线
            pathsGroup.append("path")
                .datum(pathPoints)
                .attr("class", "path path-pulse")
                .attr("d", lineGenerator);

            console.log('Bezier route drawn with', pathPoints.length, 'points');

            // =============================================
            // 妖怪类型 → 颜色映射（深色主题配色）
            // =============================================
            var typeColorMap = {
                "精怪":     "#D9585E",
                "神仙/妖仙": "#E8A84B",
                "动物":     "#3FA56B",
                "魔王":     "#7B4FD1",
                "其他":     "#8A8A8A"
            };

            function getLocationColor(d) {
                if (d.type === "起点" || d.type === "终点") return "#FFD700";
                if (d.demonsWithTypes && d.demonsWithTypes.length > 0) {
                    var t = d.demonsWithTypes[0].type;
                    return typeColorMap[t] || "#8A8A8A";
                }
                return "#8A8A8A";
            }

            function getLocationType(d) {
                if (d.demonsWithTypes && d.demonsWithTypes.length > 0) {
                    return d.demonsWithTypes[0].type;
                }
                return d.type;
            }

            // =============================================
            // 节点
            // =============================================
            var nodes = nodesGroup.selectAll(".location-node")
                .data(journeyData)
                .enter()
                .append("g")
                .attr("class", "location-node")
                .attr("data-id", function(d) { return d.id; })
                .on("click", showDetail)
                .on("mouseover", function(event, d) {
                    var html = "<strong>" + d.name + "</strong><br/>" +
                        (d.chapter ? d.chapter + "<br/>" : "") + d.description;
                    tooltipInstance.show(event, html);
                    highlightPath(d.id);
                })
                .on("mouseout", function(event) {
                    tooltipInstance.hide();
                    resetHighlight();
                });

            // 外圈光环
            nodes.append("circle")
                .attr("class", "node-ring")
                .attr("cx", function(d) { return d.position.x; })
                .attr("cy", function(d) { return d.position.y; })
                .attr("r", function(d) {
                    return (d.type === "起点" || d.type === "终点") ? 22 : 17;
                })
                .attr("fill", "none")
                .attr("stroke", getLocationColor)
                .attr("opacity", 0.45);

            // 主体圆
            nodes.append("circle")
                .attr("class", "node-circle")
                .attr("cx", function(d) { return d.position.x; })
                .attr("cy", function(d) { return d.position.y; })
                .attr("r", function(d) {
                    return (d.type === "起点" || d.type === "终点") ? 15 : 11;
                })
                .attr("fill", getLocationColor);

            // 内圈高光
            nodes.append("circle")
                .attr("class", "node-highlight")
                .attr("cx", function(d) { return d.position.x - 3.5; })
                .attr("cy", function(d) { return d.position.y - 3.5; })
                .attr("r", function(d) {
                    return (d.type === "起点" || d.type === "终点") ? 5 : 3.5;
                });

            // 序号
            nodes.append("text")
                .attr("class", "node-id")
                .attr("x", function(d) { return d.position.x; })
                .attr("y", function(d) { return d.position.y - 24; })
                .attr("text-anchor", "middle")
                .text(function(d) { return d.id; });

            // 地名
            nodes.append("text")
                .attr("class", "node-name")
                .attr("x", function(d) { return d.position.x; })
                .attr("y", function(d) { return d.position.y + 28; })
                .attr("text-anchor", "middle")
                .attr("font-size", function(d) { return d.name.length > 4 ? "12px" : "14px"; })
                .text(function(d) { return d.name; });

            console.log('Nodes created:', nodes.size());

            // =============================================
            // 路径高亮
            // =============================================
            function updatePath(layer, segment, width, opacity) {
                pathsGroup.select(layer)
                    .datum(segment)
                    .attr("d", lineGenerator)
                    .attr("stroke-width", width)
                    .attr("opacity", opacity);
            }

            function highlightPath(locationId) {
                var idx = journeyData.findIndex(function(d) { return d.id === locationId; });
                if (idx === -1) return;

                var segment = journeyData.slice(0, idx + 1).map(function(d) {
                    return [d.position.x, d.position.y];
                });

                updatePath(".path-main", segment, 6, 1);
                updatePath(".path-glow", segment, 16, 0.2);
                updatePath(".path-pulse", segment, 3, 1);
            }

            function resetHighlight() {
                updatePath(".path-main", pathPoints, 4, 0.85);
                updatePath(".path-glow", pathPoints, 12, 0.12);
                updatePath(".path-pulse", pathPoints, 2, 0.55);
            }

            // =============================================
            // 详情弹窗（居中模态）
            // =============================================
            var modal = document.getElementById("detail-modal");
            var modalChapter = document.getElementById("modal-chapter");
            var modalTitle = document.getElementById("modal-title");
            var modalType = document.getElementById("modal-type");
            var modalDesc = document.getElementById("modal-desc");
            var modalDemons = document.getElementById("modal-demons");
            var modalSummary = document.getElementById("modal-summary");

            function showDetail(event, d) {
                var loc = journeyData.find(function(l) { return l.id === d.id; });
                if (!loc) { console.error("Location " + d.id + " not found"); return; }

                // 章节
                modalChapter.textContent = loc.chapter || "取经途中";

                // 标题
                modalTitle.textContent = loc.name + " · " + (loc.type === "起点" ? "出发" : loc.type === "终点" ? "到达" : "第" + loc.id + "难");

                // 类型
                modalType.textContent = loc.type + (getLocationType(loc) !== loc.type ? " · " + getLocationType(loc) : "");

                // 简介
                modalDesc.textContent = loc.description || "（无简介）";

                // 妖怪
                modalDemons.innerHTML = "";
                if (loc.demonsWithTypes && loc.demonsWithTypes.length > 0) {
                    loc.demonsWithTypes.forEach(function(dm) {
                        var li = document.createElement("li");
                        li.innerHTML = dm.name + ' <span class="demon-type">(' + dm.type + ')</span>';
                        modalDemons.appendChild(li);
                    });
                } else {
                    var empty = document.createElement("li");
                    empty.textContent = "（此站无妖阻路）";
                    empty.style.color = "#a58a5e";
                    modalDemons.appendChild(empty);
                }

                // 概要
                modalSummary.textContent = loc.summary || "（暂无剧情概要）";

                // 打开弹窗
                modal.classList.add("open");

                // 高亮当前节点
                nodes.classed("active", function(n) { return n.id === loc.id; });

                // 八十一难联动：聚焦对应难度条目
                if (window.timeline) {
                    window.timeline.focusLocation(loc.id);
                }
            }

            function closeModal() {
                modal.classList.remove("open");
                nodes.classed("active", false);
                resetHighlight();
            }

            document.getElementById("modal-close").addEventListener("click", closeModal);

            // 点击遮罩关闭
            modal.addEventListener("click", function(e) {
                if (e.target === modal) closeModal();
            });

            // ESC 关闭
            document.addEventListener("keydown", function(e) {
                if (e.key === "Escape") closeModal();
            });

            // =============================================
            // 搜索
            // =============================================
            var searchInput   = document.getElementById("search-input");
            var searchButton  = document.getElementById("search-button");
            var clearSearch   = document.getElementById("clear-search");

            function performSearch() {
                var term = searchInput.value.toLowerCase().trim();
                if (!term) {
                    nodes.classed("highlighted", false).classed("dimmed", false);
                    return;
                }
                nodes.classed("dimmed", true)
                    .classed("highlighted", function(d) {
                        var nameMatch = d.name.toLowerCase().indexOf(term) !== -1;
                        var demonMatch = d.demons.some(function(dn) {
                            return dn.toLowerCase().indexOf(term) !== -1;
                        });
                        var summaryMatch = (d.summary || "").toLowerCase().indexOf(term) !== -1;
                        return nameMatch || demonMatch || summaryMatch;
                    });

                var hl = d3.selectAll(".location-node.highlighted");
                if (hl.size() === 1) {
                    showDetail({}, hl.data()[0]);
                }
            }

            searchButton.addEventListener("click", performSearch);
            clearSearch.addEventListener("click", function() {
                searchInput.value = "";
                nodes.classed("highlighted", false).classed("dimmed", false);
            });
            searchInput.addEventListener("keypress", function(e) {
                if (e.key === "Enter") performSearch();
            });

            // =============================================
            // 缩放控件
            // =============================================
            var controls = svg.append("g")
                .attr("class", "zoom-controls")
                .attr("transform", "translate(1690, 80)");

            function addCtrlBtn(y, w, h, fill, text, fontSize, cb) {
                controls.append("rect")
                    .attr("y", y).attr("width", w).attr("height", h)
                    .attr("fill", fill).attr("rx", 5)
                    .attr("cursor", "pointer").on("click", cb);
                controls.append("text")
                    .attr("x", w / 2).attr("y", y + h * 0.72)
                    .attr("text-anchor", "middle")
                    .attr("fill", "#fff").attr("font-size", fontSize + "px")
                    .attr("cursor", "pointer").text(text)
                    .on("click", cb);
            }

            addCtrlBtn(0,  40, 30, "#5a4426", "+",  18, function() { svg.transition().call(zoom.scaleBy, 1.25); });
            addCtrlBtn(40, 40, 30, "#5a4426", "-",  18, function() { svg.transition().call(zoom.scaleBy, 0.8); });
            addCtrlBtn(80, 40, 30, "#8c6a3c", "复位", 12, function() { svg.transition().call(zoom.transform, d3.zoomIdentity); });

            // =============================================
            // 八十一难时间轴（T23）
            // =============================================
            var timeline = window.timeline;
            if (timeline) {
                timeline.init();

                // 点击时间轴条目 → 定位地图节点 + 打开详情
                timeline.onSelect = function(diff) {
                    if (diff.locationId !== null && diff.locationId !== undefined) {
                        var loc = journeyData.find(function(l) { return l.id === diff.locationId; });
                        if (loc) {
                            showDetail({}, loc);
                            centerOnNode(loc);
                        }
                    } else {
                        timeline._toast('此难为神魔空间/过渡事件，无对应地图节点');
                    }
                };
            }

            // =============================================
            // 妖魔族谱关系图（T24）
            // =============================================
            var rg = window.relationsGraph;
            if (rg) {
                rg.init();

                // 点击带地图关联的妖怪节点 → 打开对应节点详情 + 居中
                rg.onSelect = function(node) {
                    var loc = journeyData.find(function(l) { return l.id === node.locationId; });
                    if (loc) {
                        showDetail({}, loc);
                        centerOnNode(loc);
                    }
                };
            }

            // =============================================
            // 取经动态卷轴播放（T26）
            // =============================================
            if (typeof window.Playback === 'function') {
                window.playback = new window.Playback({
                    data: journeyData,
                    svg: svg,
                    mapGroup: mapGroup,
                    pathMain: pathsGroup.select(".path-main"),
                    pathPulse: pathsGroup.select(".path-pulse"),
                    nodes: nodes,
                    centerFn: function(position) {
                        // 复用居中逻辑：节点 viewBox 坐标 → 视口居中
                        if (window.__centerSVG) window.__centerSVG(position);
                    }
                });
            }

            // 将地图视图居中平移到指定节点（保持当前缩放）
            function centerOnNode(loc) {
                if (!loc || !loc.position) return;
                centerOnPosition(loc.position);
            }

            // 按 viewBox 坐标居中（供播放器跟随使用）
            function centerOnPosition(position) {
                var svgNode = svgEl;
                if (!svgNode || !position) return;
                var w = svgNode.clientWidth || 1800;
                var h = svgNode.clientHeight || 1200;
                // 节点在 viewBox 坐标：map 组平移 (50, 110) + 节点自身坐标
                var vx = 50 + position.x;
                var vy = 110 + position.y;
                // 保持当前缩放 k，平移使节点位于视口中心
                var t = d3.zoomTransform(svgNode);
                var tx = w / 2 - t.k * vx;
                var ty = h / 2 - t.k * vy;
                svg.transition().duration(500).call(
                    zoom.transform,
                    d3.zoomIdentity.translate(tx, ty).scale(t.k)
                );
            }

            // 暴露给播放器
            window.__centerSVG = centerOnPosition;
        }

        // 处理 DOM 加载竞态
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setupMap);
        } else {
            setupMap();
        }
    }

    init();
})();