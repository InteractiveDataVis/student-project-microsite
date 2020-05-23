/**
 * Script to fetch data from google sheet
 * Pulls data as well as images
 * Changes image paths to relative file paths
 *  */

const fs = require("fs");
const axios = require("axios");
const { csvParse, csvFormat, autoType } = require("d3");
const {
  appConfig: { makeImgPath },
} = require("./src/utils/constants");

const sheetOpt = {
  id: "1jg1quJkA0nngDk6mu-DBl7kv0ZYtU4XmLEmrbewTuuI",
  gid: 1307304957,
};
const sheetURL = `https://docs.google.com/spreadsheets/u/1/d/${sheetOpt.id}/export?format=csv&id=${sheetOpt.id}&gid=${sheetOpt.gid}`;

axios
  .get(sheetURL)
  .then(
    ({ data }) => csvParse(data, autoType),
    (err) => console.log("err", err)
  )
  .then((data) => {
    console.log("data", data);

    const imagesToFetch = data
      .reduce((acc, { name, img1, img2 }) => {
        return [
          ...acc,
          img1 ? [makeImgPath(name, "img1"), img1] : [],
          img2 ? [makeImgPath(name, "img2"), img2] : [],
        ];
      }, [])
      .filter(([d]) => d);

    // console.log("imagesToFetch", imagesToFetch);

    let errors = [];
    imagesToFetch.forEach(
      async ([path, url]) =>
        await axios({ method: "get", url: url, responseType: "stream" }).then(
          (response) => {
            response.data.pipe(fs.createWriteStream(path));
          },
          (err) => {
            console.log("err", path, err);
            errors.push([path, err]);
          }
        )
    );

    const newData = data.map((d) => ({
      ...d,
      img1: d.img1 ? makeImgPath(d.name, "img1") : null,
      img2: d.img2 ? makeImgPath(d.name, "img2") : null,
    }));

    fs.writeFileSync("./public/siteData.csv", csvFormat(newData));
  });
