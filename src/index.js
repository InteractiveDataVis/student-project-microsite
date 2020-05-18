import { select, csv, autoType, ascending } from "d3";
import { Animation } from "./components/Animation";
import { Title } from "./components/Title";
import { StudentList } from "./components/StudentList";
import { Content } from "./components/Content";

import "./style.scss";

import { appConfig } from "./utils/constants";
const { titleDelay, getName } = appConfig;

class Controller {
  state = {
    selectedStudent: null,
    isAnimating: true,
    data: [],
  };

  constructor() {
    this.app = select("body").append("div").attr("class", "container");
    this.animation = new Animation();
    this.animation.startAnimation();

    csv("public/siteData.csv", autoType).then((data) => {
      this.data = data.sort((a, b) => ascending(getName(a), getName(b)));
      this.init();
      console.log("this.data", this.data);
    });
  }

  init() {
    this.title = new Title();
    this.studentList = new StudentList(this.data);
    this.content = new Content(this.data);

    // fade in the title and student list
    setTimeout(() => {
      this.title.makeVisible();
      this.studentList.makeVisible();
    }, titleDelay);

    // add resize handler
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    console.log("resizing");
    this.animation.resize();
  }
}

new Controller();
