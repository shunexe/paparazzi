const fs = require("fs");
const gulp = require("gulp");
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");

console.log("STEP2: Rendering ...");
gulp.task("ejs", function (cb) {
  // JSONファイル読み込み
  const value = JSON.parse(fs.readFileSync("./tree.json"));
  //console.log(value);
  const json = { jsonData: value };
  gulp
    .src("./test.ejs")
    .pipe(ejs(json, { ext: ".html" })) // EJS内でjsonをデータを当て込む
    .pipe(rename("output.html"))
    .pipe(gulp.dest("."));
  cb(); // gulp処理の完了
  console.log("       Rendering is completed");
});
