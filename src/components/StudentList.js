import { select } from "d3";
import { listConfig, appConfig, keys } from "../utils/constants";

const { delay } = listConfig;
const { getHash } = appConfig;
const { name } = keys;

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
      .text(d => d[name])
      .style("transition-delay", (d, i) => `${i * delay}ms`)
      .on("click", this.scrollToName);
  }

  scrollToName(d) {
    select(`#${getHash(d[name])}`)
      .node()
      .scrollIntoView({ behavior: "smooth" });
  }

  makeVisible() {
    this.list.selectAll("div.row").classed("visible", true);
  }
}
