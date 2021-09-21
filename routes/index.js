var express = require("express");
var router = express.Router();
const puppeteer = require("puppeteer");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* Avis Google. */
router.get("/google-reviews", async (req, res, next) => {
  var search = req.query.search;
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-web-security",
    ],
  });

  const context = browser.defaultBrowserContext();
  const page = await browser.newPage();
  // await context.overridePermissions("https://www.google.fr/", ["geolocation"]);
  // await page.setGeolocation({ latitude: 45.764043, longitude: 4.835659 });
  // await page.goto(`https://www.google.fr/search?q=${search}`);
  await page.goto(`https://www.google.fr/search?q=${search}&hl=fr`);
  await page.click("#L2AGLb > div");
  await page.click("span.hqzQac > span > a > span");
  await page.waitForTimeout(1500);
  const avis = await page.evaluate(() => {
    let reviews = [];
    let name = document.querySelector("div.P5Bobd").textContent;
    let number_rating = document.querySelector("span.z5jxId").textContent;
    let rating = document.querySelector("span.Aq14fc").textContent;
    let elements = document.querySelectorAll(
      "div.WMbnJf.vY6njf.gws-localreviews__google-review"
    );
    for (element of elements) {
      let ratingConverse = String(
        element.querySelector(".Fam1ne.EBe2gf").getAttribute("aria-label")
      ).split("");
      if (ratingConverse[7] >= 4) {
        reviews.push({
          pseudo: element.querySelector("div.TSUbDb").textContent,
          comment: element.querySelector("div.Jtu6Td").textContent,
          rating: ratingConverse[7],
          time: element.querySelector("span.dehysf.lTi8oc").textContent,
          img: element.querySelector("img.lDY1rd").src,
        });
      }
    }
    return { name, rating, number_rating, reviews };
  });

  await browser.close();

  res.json({ result: avis });
});

module.exports = router;
