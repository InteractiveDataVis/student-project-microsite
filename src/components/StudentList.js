import { select, csv, autoType, ascending } from "d3";
import { listConfig } from "../utils/constants";

const { getName, delay } = listConfig;

export class StudentList {
  constructor() {
    csv("public/siteData.csv", autoType).then((data) => {
      this.data = data.sort((a, b) => ascending(getName(a), getName(b)));
      this.init();
    });
  }

  init() {
    this.list = select(".container").append("div").attr("id", "student-list");

    this.list
      .selectAll("div.row")
      .data(this.data)
      .join("div")
      .attr("class", "row")
      .text(getName)
      .style("transition-delay", (d, i) => `${i * delay}ms`);
  }

  makeVisible() {
    this.list.selectAll("div.row").classed("visible", true);
  }
}
