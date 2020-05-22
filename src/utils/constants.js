export const getRandom = (min = -1, max = 1) =>
  Math.random() * (max - min) + min;

export const keys = {
  name: "name",
  desc: "description",
  github: "github",
  portfolio: "portfolioLink",
  website: "websiteLink",
  title: "portfolioTitle",
  previewImg: "previewImg",
};

export const appConfig = {
  titleDelay: 2500,
  getHash: (str) => str.toLowerCase().split(" ").join("_").split(",").join("_"),
};

export const animationConfig = {
  getWidth: () => window.innerWidth,
  getHeight: () => window.innerHeight,
  count: 25,
  delay: 1500,
  drawRate: 35,
};

export const listConfig = {
  delay: 75,
};
