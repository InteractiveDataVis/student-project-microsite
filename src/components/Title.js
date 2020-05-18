import { select } from "d3";

export class Title {
  constructor() {
    this.el = select(".container")
      .append("div")
      .attr("id", "page-title")
      .text("Interactive Data Visualization")
      .classed("visible", false);
  }

  makeVisible() {
    this.el.classed("visible", true);
  }

  makeHidden() {
    this.el.classed("visible", false);
  }
}
