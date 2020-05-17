import { select } from "d3";
const Title = () => {
  console.log("testing");
  select("#container").append("h1").text("Interactive Data Visualization");
};

export default Title;
