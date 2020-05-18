import { Animation } from "./components/Animation";
import { Title } from "./components/Title";
import { StudentList } from "./components/StudentList";

import "./style.scss";

import { appConfig } from "./utils/constants";
const { titleDuration } = appConfig;

class Controller {
  state = {
    selectedStudent: null,
    isAnimating: true,
  };

  constructor() {
    this.init();
  }

  init() {
    this.animation = new Animation();
    this.title = new Title();
    this.studentList = new StudentList();
    this.animation.startAnimation();
    setTimeout(() => this.title.makeVisible(), titleDuration);
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    console.log("resizing");
    this.animation.resize();
  }
}

new Controller();
