// 主逻辑 - D3.js 可视化
// 浏览器环境中直接使用全局变量
const journeyData = window.journeyData;
const tooltip = window.tooltip;

console.log('journeyData length:', journeyData.length);

document.addEventListener('DOMContentLoaded', function() {
    // 设置 SVG 容器
    const svg = d3.select("#journey-map");
    const mapGroup = svg.select("#map");
    const pathsGroup = mapGroup.select("#paths");
    const nodesGroup = mapGroup.select("#nodes");

    // 地图尺寸 - 响应式调整
    function getMapDimensions() {
        const width = Math.min(window.innerWidth - 40, 1500);
        const height = Math.min(window.innerHeight - 300, 1000);

        // 根据屏幕大小动态调整
        if (window.innerWidth <= 768) {
            return { width: width * 0.8, height: height * 0.6 };
        } else if (window.innerWidth <= 1024) {
            return { width: width * 0.9, height: height * 0.8 };
        } else {
            return { width: width, height: height };
        }
    }

    let currentMapSize = getMapDimensions();

    // 缩放和平移
    const zoom = d3.zoom()
        .scaleExtent([0.5, 3])
        .translateExtent([[-currentMapSize.width, -currentMapSize.height],
                        [currentMapSize.width * 2, currentMapSize.height * 2]])
        .on("zoom", function(event) {
            mapGroup.attr("transform", event.transform);
        });

    // 触摸设备支持
    if ('ontouchstart' in window) {
        svg.style('touch-action', 'none');
    }

    svg.call(zoom);

    // 绘制路径
    const path = d3.line()
        .x(d => d.position.x)
        .y(d => d.position.y)
        .curve(d3.curveMonotoneX)
        .context(null);

    // 创建路径数据
    const pathData = journeyData.map(d => d.position);

    // 添加路径到 SVG
    pathsGroup.append("path")
        .datum(pathData)
        .attr("class", "path path-animated")
        .attr("d", path)
        .style("stroke", "url(#pathGradient)")
        .style("stroke-width", 3)
        .style("fill", "none")
        .style("opacity", 0.7);

    // 创建节点
    const nodes = nodesGroup.selectAll(".location-node")
        .data(journeyData)
        .enter()
        .append("g")
        .attr("class", d => "location-node " + getLocationTypeClass(d))
        .on("click", showDetail)
        .on("mouseover", function(event, d) {
            // 创建悬停文本
            const hoverText = `<strong>${d.name}</strong><br/>${d.description}`;
            tooltip.show(event, hoverText);

            // 高亮路径
            highlightPath(d.id);
        })
        .on("mouseout", function(event) {
            tooltip.hide();
            resetHighlight();
        });

    // 添加圆形节点
    nodes.append("circle")
        .attr("r", d => d.type === "起点" || d.type === "终点" ? 12 : 8)
        .attr("cx", d => d.position.x)
        .attr("cy", d => d.position.y);

    // 添加地点名称
    nodes.append("text")
        .attr("x", d => d.position.x)
        .attr("y", d => d.position.y + 20)
        .text(d => d.name)
        .style("font-size", d => d.name.length > 4 ? "10px" : "12px");

    // 添加序号
    nodes.append("text")
        .attr("x", d => d.position.x)
        .attr("y", d => d.position.y - 15)
        .attr("text-anchor", "middle")
        .style("font-size", "10px")
        .style("fill", "#666")
        .text(d => d.id);

    // 获取地点类型类名
    function getLocationTypeClass(location) {
        if (location.type === "起点" || location.type === "终点") {
            return location.type.toLowerCase();
        }

        // 检查是否有妖怪
        if (location.demons.length > 0) {
            // 根据第一个妖怪的类型返回类名
            const demon = location.demonsWithTypes[0];
            switch (demon.type) {
                case "精怪": return "spirit";
                case "神仙/妖仙": return "god";
                case "动物": return "animal";
                case "魔王": return "devil";
                default: return "other";
            }
        }

        return "other";
    }

    // 高亮路径
    function highlightPath(locationId) {
        // 高亮当前节点到终点的路径
        const endIndex = journeyData.findIndex(d => d.id === locationId);
        const highlightedPath = journeyData.slice(0, endIndex + 1).map(d => d.position);

        // 更新主路径
        pathsGroup.select(".path")
            .datum(highlightedPath)
            .attr("d", path)
            .style("stroke-width", 5)
            .style("opacity", 1);
    }

    // 重置高亮
    function resetHighlight() {
        pathsGroup.select(".path")
            .datum(pathData)
            .attr("d", path)
            .style("stroke-width", 3)
            .style("opacity", 0.7);
    }

    // 显示详情弹窗
    function showDetail(event, d) {
        const modal = document.getElementById("detail-modal");
        const modalTitle = document.getElementById("modal-title");
        const modalInfo = document.getElementById("modal-info");

        // 设置标题
        modalTitle.innerHTML = `${d.name} <span style="font-size: 0.6em; color: #666;">(#${d.id})</span>`;

        // 设置内容
        let content = `
            <div class="info-section">
                <h4>📍 地点类型</h4>
                <p>${d.type}</p>
            </div>
        `;

        if (d.description) {
            content += `
                <div class="info-section">
                    <h4>📖 简介</h4>
                    <p>${d.description}</p>
                </div>
            `;
        }

        if (d.demons.length > 0) {
            content += `
                <div class="info-section">
                    <h4>👹 妖怪</h4>
                    <ul class="demon-list">
            `;
            d.demonsWithTypes.forEach(demon => {
                content += `<li>${demon.name} <span style="color: #666; font-size: 0.9em;">(${demon.type})</span></li>`;
            });
            content += `
                    </ul>
                </div>
            `;
        }

        if (d.events.length > 0) {
            content += `
                <div class="info-section">
                    <h4>📜 关键事件</h4>
                    <ul class="event-list">
            `;
            d.events.forEach(event => {
                content += `<li>${event}</li>`;
            });
            content += `
                    </ul>
                </div>
            `;
        }

        modalInfo.innerHTML = content;
        modal.style.display = "block";

        // 添加动画效果
        nodes.classed("active", function(node) {
            return node.id === d.id;
        });
    }

    // 关闭弹窗
    document.querySelector(".close").onclick = function() {
        document.getElementById("detail-modal").style.display = "none";
        nodes.classed("active", false);
    };

    // 点击弹窗外部关闭
    window.onclick = function(event) {
        const modal = document.getElementById("detail-modal");
        if (event.target == modal) {
            modal.style.display = "none";
            nodes.classed("active", false);
        }
    };

    // 响应式调整地图尺寸
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            updateMapSize();
        }, 250);
    });

    function updateMapSize() {
        const newSize = getMapDimensions();

        // 更新 SVG 尺寸
        svg.attr("viewBox", `0 0 ${newSize.width} ${newSize.height}`);

        // 调整路径数据比例
        const scaleFactor = newSize.width / currentMapSize.width;

        // 重新绘制路径
        const newPath = d3.line()
            .x(d => d.position.x * scaleFactor)
            .y(d => d.position.y * scaleFactor)
            .curve(d3.curveMonotoneX);

        pathsGroup.select(".path")
            .datum(journeyData.map(d => ({
                x: d.position.x * scaleFactor,
                y: d.position.y * scaleFactor
            })))
            .attr("d", newPath);

        // 更新节点位置
        nodes.attr("transform", function(d) {
            return `translate(${d.position.x * scaleFactor}, ${d.position.y * scaleFactor})`;
        });

        // 更新缩放控制按钮位置
        const controlsX = newSize.width - 150;
        controls.attr("transform", `translate(${controlsX}, 40)`);

        currentMapSize = newSize;
    }

    // 添加缩放控制按钮
    const controls = svg.append("g")
        .attr("class", "zoom-controls")
        .attr("transform", "translate(1050, 40)");

    // 放大按钮
    controls.append("rect")
        .attr("width", 40)
        .attr("height", 30)
        .attr("fill", "#8b4513")
        .attr("rx", 5)
        .attr("cursor", "pointer")
        .on("click", function() {
            svg.transition().call(zoom.scaleBy, 1.2);
        });

    controls.append("text")
        .attr("x", 20)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("fill", "white")
        .style("font-size", "16px")
        .text("+")
        .attr("cursor", "pointer")
        .on("click", function() {
            svg.transition().call(zoom.scaleBy, 1.2);
        });

    // 缩小按钮
    controls.append("rect")
        .attr("y", 40)
        .attr("width", 40)
        .attr("height", 30)
        .attr("fill", "#8b4513")
        .attr("rx", 5)
        .attr("cursor", "pointer")
        .on("click", function() {
            svg.transition().call(zoom.scaleBy, 0.8);
        });

    controls.append("text")
        .attr("x", 20)
        .attr("y", 60)
        .attr("text-anchor", "middle")
        .style("fill", "white")
        .style("font-size", "16px")
        .text("-")
        .attr("cursor", "pointer")
        .on("click", function() {
            svg.transition().call(zoom.scaleBy, 0.8);
        });

    // 重置按钮
    controls.append("rect")
        .attr("y", 40)
        .attr("width", 40)
        .attr("height", 30)
        .attr("fill", "#daa520")
        .attr("rx", 5)
        .attr("cursor", "pointer")
        .on("click", function() {
            svg.transition().call(zoom.transform, d3.zoomIdentity);
        });

    controls.append("text")
        .attr("x", 20)
        .attr("y", 40)
        .attr("text-anchor", "middle")
        .style("fill", "white")
        .style("font-size", "12px")
        .text("重置")
        .attr("cursor", "pointer")
        .on("click", function() {
            svg.transition().call(zoom.transform, d3.zoomIdentity);
        });
});