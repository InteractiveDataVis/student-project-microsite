import { select } from "d3";
import { Animation } from "./components/Animation";
import { Title } from "./components/Title";
import { StudentList } from "./components/StudentList";

import "./style.scss";

import { appConfig } from "./utils/constants";
const { titleDelay } = appConfig;

class Controller {
  state = {
    selectedStudent: null,
    isAnimating: true,
  };

  constructor() {
    this.app = select("body").append("div").attr("class", "container");
    this.init();
  }

  init() {
    this.animation = new Animation();
    this.title = new Title();
    this.studentList = new StudentList();
    this.animation.startAnimation();

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
