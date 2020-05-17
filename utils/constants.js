export const getRandom = (min = -1, max = 1) =>
  Math.random() * (max - min) + min;

export const appConfig = {
  titleDuration: 2500,
};

export const animationConfig = {
  width: window.innerWidth,
  height: window.innerHeight,
  count: 25,
  delay: 1500,
  drawRate: 35,
};
