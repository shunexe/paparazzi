#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
//ファイル一覧取得関数
function readdir(dir) {
  const files = fs.readdirSync(dir);
  //console.log("file一覧", files);
  let children = [];
  files.map(function (item) {
    //console.log(item);
    var newItem = path.join(dir, item);
    //console.log(newItem);
    const result = fs.statSync(newItem).isFile();
    //console.log(result);
    if (result == true) {
      //console.log(item, "はfileです");
      children.push({ name: item, children: [] });
    } else {
      //console.log(item, "はfileではありません");
      children.push(readdir(newItem));
    }
  });
  let tree = {};
  tree["name"] = path.basename(dir);
  tree["children"] = children;
  return tree;
}
const input = process.argv[2];
let pathToDirectory = "";
if (input == undefined) {
  console.log("STEP1: Analyzing current directory..");
  // console.log(__dirname);
  // console.log(path.basename(__dirname));
  //process.exit(1);
  //console.log(process.cwd());
  pathToDirectory = process.cwd();
} else {
  console.log("STEP1: Analyzing the given path..");
  pathToDirectory = input;
}
const result = readdir(pathToDirectory);

//ファイルに書き出し
try {
  //console.log(process.argv[1]);
  //console.log(path.dirname(process.argv[1]));
  const pathToScript = path.dirname(process.argv[1]);
  fs.writeFileSync(
    path.join(pathToScript, "tree.json"),
    JSON.stringify(result)
  );
  console.log("       Analysis is completed.");
} catch (e) {
  console.log(e);
  process.exit(1);
}
