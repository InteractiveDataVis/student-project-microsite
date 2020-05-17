import { select } from "d3";
import { Triangle } from "./Triangle";
import { animationConfig } from "../utils/constants";

const { width, height, count, delay, drawRate } = animationConfig;
const [x, y] = [width / 2, height / 2];

export class Animation {
  intervalId;
  intervalCount = 0;

  constructor() {
    this.triangles = [];

    this.canvas = select("body")
      .append("canvas")
      .attr("id", "animation")
      .attr("width", width)
      .attr("height", height);

    this.ctx = this.canvas.node().getContext("2d");

    [...Array(count)].forEach((d, i) =>
      setTimeout(() => this.triangles.push(new Triangle(this.ctx)), i * delay)
    );
  }

  draw() {
    this.intervalCount++;
    this.ctx.fillStyle = "rgba(210, 210, 210, 0.05)";
    this.ctx.fillRect(0, 0, width, height); // clear canvas
    this.triangles.map((t) => t.update([x, y]));
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
