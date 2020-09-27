const path = require("path");
const pathToScript = path.dirname(process.argv[1]);
const fullPathToImage = path.join(pathToScript, "map.png");

console.log("You can also check the image here", "\n", fullPathToImage);
