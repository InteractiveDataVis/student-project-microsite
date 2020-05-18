import { select, csv, autoType } from "d3";

export class StudentList {
  constructor() {
    this.data = csv("public/siteData.csv", autoType).then(console.log);
  }
}
