import { select } from "d3";
import { keys, appConfig } from "../utils/constants";

import GithubIcon from "../assets/github.svg";
import UpArrow from "../assets/arrow_upward-24px.svg";

const { getName, getHash } = appConfig;
const { desc, github } = keys;

export class Content {
  constructor(data) {
    this.data = data;
    this.init();
  }

  init() {
    this.contentWrapper = select("#grid")
      .append("div")
      .attr("id", "content-wrapper");

    this.students = this.contentWrapper
      .selectAll("div.student")
      .data(this.data)
      .join("div")
      .attr("class", "student")
      .attr("id", (d) => getHash(getName(d)));

    // name
    this.students
      .append("div")
      .attr("class", "student-name")
      .text((d) => getName(d));

    // socials
    this.students
      .append("a")
      .attr("class", "student-socials")
      .attr("href", (d) => d[github])
      .append("img")
      .attr("class", "github")
      .attr("src", GithubIcon);

    // description
    this.students
      .append("div")
      .attr("class", "student-desc")
      .text((d) => d[desc]);

    this.students
      .append("span")
      .attr("class", "scroll-to-top")
      .append("img")
      .attr("class", "up-arrow")
      .attr("src", UpArrow)
      .on("click", this.scrollToTop);
  }

  scrollToTop() {
    select(`body`).node().scrollIntoView({ behavior: "smooth" });
  }

  get node() {
    return this.contentWrapper.node()
  }

  makeFixed(headerHeight = 250) {
    console.log('in make fixed')
    this.contentWrapper
      .style("position", "sticky")
      .style("height", `${window.innerHeight - headerHeight}px`)
      .style("top", `${headerHeight}px`)
  }
}
