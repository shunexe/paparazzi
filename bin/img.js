const puppeteer = require("puppeteer");
const path = require("path");

(async () => {
  const browser = await puppeteer.launch({
    headless: true, // 動作確認するためheadlessモードにしない
  });
  const page = await browser.newPage();
  const pathToScript = path.dirname(process.argv[1]);
  await page.goto("file://" + path.join(pathToScript, "output2.html"));
  await page.setViewport({
    width: 2000,
    height: 1500,
    deviceScaleFactor: 1,
  });
  await page.screenshot({
    path: path.join(pathToScript, "map.png"),
    fullPage: true,
  });
  await browser.close();
  console.log("STEP3: The image is generated!");
})();
