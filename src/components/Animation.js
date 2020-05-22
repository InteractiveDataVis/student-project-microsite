import { select } from "d3";
import { Triangle } from "./Triangle";
import { animationConfig } from "../utils/constants";

const { getWidth, getHeight, count, delay, drawRate } = animationConfig;

export class Animation {
  intervalId;
  intervalCount = 0;
  width = getWidth();
  height = getHeight();
  x = this.width / 2;
  y = this.height / 2;

  constructor() {
    this.canvas = select("#grid")
      .append("canvas")
      .attr("id", "animation")
      .attr("width", this.width)
      .attr("height", this.height);

    this.ctx = this.canvas.node().getContext("2d");
    this.initTriangles();
  }

  initTriangles() {
    this.triangles = [];
    if (this.timers) this.timers.forEach(clearTimeout);
    this.timers = [...Array(count)].map((d, i) =>
      setTimeout(() => this.triangles.push(new Triangle(this.ctx)), i * delay)
    );
  }

  draw() {
    this.intervalCount++;
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    this.ctx.fillRect(0, 0, this.width, this.height); // clear canvas
    this.triangles.map((t) => t.update([this.x, this.y]));
  }

  resize() {
    this.width = getWidth();
    this.height = getHeight();
    // reset on resize
    this.canvas.attr("width", this.width).attr("height", this.height);
    this.ctx = this.canvas.node().getContext("2d");
    this.ctx.fillStyle = "rgba(255, 255, 255, 1)";
    this.ctx.fillRect(0, 0, this.width, this.height); // clear canvas
    this.initTriangles();
  }

  startAnimation() {
    // note: doing `()=> this.function` maintains the proper scoping for the method
    // so that it has access to the object as `this`
    this.intervalId = setInterval(() => this.draw(), drawRate);
  }

  stopAnimation() {
    clearInterval(this.intervalId);
  }
}
