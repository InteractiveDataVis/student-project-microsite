export const getRandom = (min = -1, max = 1) =>
  Math.random() * (max - min) + min;

export const appConfig = {
  titleDuration: 2500,
};

export const animationConfig = {
  getWidth: () => window.innerWidth,
  getHeight: () => window.innerHeight,
  count: 25,
  delay: 1500,
  drawRate: 35,
};

export const keys = {
  name: "Name",
  display_name: "Preferred Name↵ (Display Name)",
  desc:
    "Description↵(up to 100-150 words about yourself or your project abstract/motivation)",
  github: "Github Handle",
  portfolio: "Portfolio/Project Link",
  website: "Personal Website↵(optional)",
  title: "Portfolio/Project Title ↵(text that will link out to your site)",
};
