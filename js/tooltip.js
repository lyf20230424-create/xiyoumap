// 提示框组件
class Tooltip {
    constructor() {
        this.tooltip = d3.select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)
            .style("position", "absolute")
            .style("background", "rgba(0, 0, 0, 0.8)")
            .style("color", "#fff")
            .style("padding", "10px")
            .style("border-radius", "5px")
            .style("font-size", "14px")
            .style("pointer-events", "none")
            .style("z-index", "1000");
    }

    show(event, text) {
        this.tooltip
            .style("opacity", 1)
            .html(text)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
    }

    hide() {
        this.tooltip.style("opacity", 0);
    }
}

// 创建提示框实例
const tooltip = new Tooltip();