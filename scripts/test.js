const fs = require('fs').promises;
const { read } = require('fs');
const path = require("path");

const name = "sample";
const creator = "creator1";
const description = "this is file";
const format = ".txt";
const copyright = "FREE";
const modelPath = "https://hoge";

(async () => {
  let readJsonString = await fs.readFile
  (path.resolve(__dirname, "../files/templates/template.json"), "utf8");
  let readJson = JSON.parse(readJsonString);
  console.log(typeof readJson)

  readJson.properties.name.description = name;
  readJson.properties.creator.description = creator;
  readJson.properties.description.description = description;
  readJson.properties.format.description = format;
  readJson.properties.copyright.description = copyright;
  readJson.properties.model.description = modelPath;

  await fs.writeFile
  (path.resolve(__dirname, `../files/metadatas/model-${Date.now()}.json`), JSON.stringify(readJson, null, "\t"));
})()