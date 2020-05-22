import { select } from "d3";
import { listConfig, appConfig } from "../utils/constants";

const { delay } = listConfig;
const { getHash, getName } = appConfig;

export class StudentList {
  constructor(data) {
    this.data = data;
    this.init();
  }

  init() {
    this.list = select("#grid").append("div").attr("id", "student-list");

    this.list
      .selectAll("div.row")
      .data(this.data)
      .join("div")
      .attr("class", "row")
      .text(getName)
      .style("transition-delay", (d, i) => `${i * delay}ms`)
      .on("click", this.scrollToName);
  }

  scrollToName(d) {
    select(`#${getHash(getName(d))}`)
      .node()
      .scrollIntoView({ behavior: "smooth" });
  }

  makeVisible() {
    this.list.selectAll("div.row").classed("visible", true);
  }
}
