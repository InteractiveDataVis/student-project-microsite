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
    select("body").append("div")
      .attr("id", "grid")

    this.animation = new Animation();
    this.animation.startAnimation();

    csv("public/siteData.csv", autoType).then((data) => {
      this.data = data.sort((a, b) => ascending(getName(a), getName(b)));
      this.init();
      console.log("this.data", this.data);
    });

    this.handleScroll = this.handleScroll.bind(this)
  }

  init() {
    // set it so window scrolls to top when reset
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };

    this.title = new Title();
    this.studentList = new StudentList(this.data);
    this.content = new Content(this.data);

    // to switch the title to fixed header on scroll
    // observe when bottom content section comes into screen
    this.observer = new IntersectionObserver(this.handleScroll, {
      root: null,
      rootMargin: '0px',
      threshold: [.1],
    });
    this.observer.observe(this.content.node)

    // fade in the title and student list
    setTimeout(() => {
      this.title.makeVisible();
      this.studentList.makeVisible();
    }, titleDelay);

    // add resize handler
    window.addEventListener("resize", () => this.resize());
  }

  handleScroll(entries) {
    console.log('entries', entries)
    if (entries[0].isIntersecting) {
      this.title.makeFixed()
    }
    else this.title.makeUnFixed()
  }

  resize() {
    this.animation.resize();
  }
}

new Controller();
