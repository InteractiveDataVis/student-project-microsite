import { Animation } from "./Animation";
import { Title } from "./Title";

import "./style.scss";

import { appConfig } from "../utils/constants";
const { titleDuration } = appConfig;

class Controller {
  state = {
    selectedStudent: null,
    isAnimating: true,
  };

  constructor() {
    this.animation = new Animation();
    this.title = new Title();
    this.animation.startAnimation();

    setTimeout(() => this.title.makeVisible(), titleDuration);
  }
}

new Controller();
