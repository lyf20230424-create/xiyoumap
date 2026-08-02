// 提示框组件 - 深色水墨主题
class Tooltip {
    constructor() {
        this.tooltip = d3.select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)
            .style("position", "absolute")
            .style("pointer-events", "none")
            .style("z-index", 2000);
    }

    show(event, text) {
        this.tooltip
            .style("opacity", 1)
            .html(text)
            .style("left", (event.pageX + 15) + "px")
            .style("top", (event.pageY - 30) + "px");
    }

    hide() {
        this.tooltip.style("opacity", 0);
    }
}

// 创建提示框实例并暴露到全局
window.tooltip = new Tooltip();