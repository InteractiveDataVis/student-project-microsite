import { select } from "d3";
import { keys, appConfig } from "../utils/constants";

import GithubIcon from "../assets/github.svg";
import UpArrow from "../assets/arrow_upward-24px.svg";
import LaunchIcon from "../assets/launch-24px.svg";

const { getHash } = appConfig;
const { desc, github, name, title, portfolio, prevImg1, prevImg2 } = keys;

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
      .attr("id", (d) => getHash(d[name]));

    // name
    this.students
      .append("div")
      .attr("class", "student-name")
      .text((d) => d[name]);

    const socials = [
      { key: github, icon: GithubIcon, title: "Open Github" },
      { key: portfolio, icon: LaunchIcon, title: "See Portfolio" },
    ]

    // socials
    this.students
      .selectAll("student-socials")
      .data(d => socials.map(s => ({
        ...s,
        link: d[s.key],
        title: d[title] ? `See ${d[title]}` : s.title
      })))
      .join("a")
      .filter(d => d.link)
      .attr("class", "student-socials")
      .attr("href", (d) => d.link)
      .attr("title", d => d.title)
      .attr("target", "_blank")
      .attr("rel", "noopener")
      .append("img")
      .attr("class", d => d.key)
      .attr("src", d => d.icon);

    // description
    const work = this.students.append("div")
      .attr("class", "student-work-grid")

    work.append("div")
      .attr("class", "student-desc")
      .text((d) => d[desc]);

    const images = [prevImg1, prevImg2]

    work.append("div")
      .attr("class", "student-images")
      .selectAll(".student-img").data(d => images.map(i => d[i]).filter(d => d))
      .join("img")
    // Note: currently REALLY slow — need to find image loading solution
    // .attr("loading", "lazy")
    // .attr("class", "student-img")
    // .attr("src", d => d);

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
