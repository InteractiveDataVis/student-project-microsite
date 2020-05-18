import { getRandom, animationConfig } from "../utils/constants";

const { getWidth, getHeight, count, delay, drawRate } = animationConfig;

export class Triangle {
  width = getWidth();
  height = getHeight();

  constructor(ctx) {
    this.ctx = ctx;
    this.resetPoints();
    this.opacity = 1;
    this.draw();
    this.count = 0;
  }

  draw() {
    const [cx, cy] = this.calcCentroid();
    this.ctx.save();
    this.ctx.translate(this.width / 2 - cx, this.height / 2 - cy);
    this.ctx.beginPath();
    this.ctx.strokeStyle = "steelblue";
    this.ctx.globalAlpha = this.opacity;
    this.ctx.moveTo(this.p1.x, this.p1.y);
    this.ctx.lineTo(this.p2.x, this.p2.y);
    this.ctx.lineTo(this.p3.x, this.p3.y);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.restore();
  }

  update() {
    this.opacity = Math.max(this.opacity - 0.003, 0);
    this.p1 = this.updatePoint(this.p1);
    this.p2 = this.updatePoint(this.p2);
    this.p3 = this.updatePoint(this.p3);
    this.count += 1;
    this.checkBounds();
    this.draw();
  }

  checkBounds() {
    const inBounds = [this.p1, this.p2, this.p3].reduce(
      (inBounds, { x, y }) => inBounds && x < this.width && y < this.height,
      true
    );
    if (!inBounds && this.count > (delay / drawRate) * count)
      this.resetPoints();
  }

  resetPoints() {
    this.opacity = 1;
    this.p1 = { x: 0, y: 0, ...this.getRandomUnitVector() };
    this.p2 = { x: 0, y: 0, ...this.getRandomUnitVector() };
    this.p3 = { x: 0, y: 0, ...this.getRandomUnitVector() };
    this.count = 0;
  }

  getRandomUnitVector() {
    const [mx, my] = [getRandom(), getRandom()]; //[deltaX, deltaY]
    const mag = Math.sqrt(mx ** 2 + my ** 2);
    return { mx: mx / mag, my: my / mag };
  }

  calcCentroid() {
    const { p1, p2, p3 } = this;
    return [(p1.x + p2.x + p3.x) / 3, (p1.y + p2.y + p3.y) / 3];
  }

  updatePoint({ x, y, mx, my }) {
    // they appear to get slower as they get larger, so gradually increase
    // the mx/my so that they accelerate out
    return { x: x + mx, y: y + my, mx: mx * 1.005, my: my * 1.005 };
  }
}
