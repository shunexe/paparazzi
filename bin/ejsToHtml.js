const fs = require("fs");
const ejs = require("ejs");
const path = require("path");
const pathToScript = path.dirname(process.argv[1]);
const pathToJson = path.join(pathToScript, "tree.json");
const value = JSON.parse(fs.readFileSync(pathToJson));
const pathToEjs = path.join(pathToScript, "test2.ejs");
ejs.renderFile(
  pathToEjs,
  {
    jsonData: value,
  },
  function (err, html) {
    // 出力ファイル名
    const file = path.join(pathToScript, "output2.html");

    // テキストファイルに書き込む
    fs.writeFile(file, html, "utf8", (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("STEP2: Rendering is completed");
      }
    });
  }
);
