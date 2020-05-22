import { select } from "d3";

export class Title {
  constructor() {
    this.el = select("#grid")
      .append("div")
      .attr("id", "page-title")
      .classed("visible", false);

    this.el.append("div")
      .attr("class", "title")
      .text("Interactive Data Visualization Showcase")

    this.el.append("div").attr("class", "subtitle")
      .text("Student portfolios from Spring 2020 Masters in Data Visualization Program at the CUNY Graduate Center")
  }

  makeVisible() {
    this.el.classed("visible", true);
  }

  makeHidden() {
    this.el.classed("visible", false);
  }

  makeFixed() {
    this.el.classed("fixed", true);
  }

  makeUnFixed() {
    this.el.classed("fixed", false);
  }
}
