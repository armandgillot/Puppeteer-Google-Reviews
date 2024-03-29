var express = require("express");
var router = express.Router();
const puppeteer = require("puppeteer");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* Avis Google. */
router.get("/google-reviews", async (req, res, next) => {
  console.log("Lancement de la route");
  var search = req.query.search;
  const browser = await puppeteer.launch({
    // headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-web-security",
    ],
  });
  console.log("Lancement de chrome");

  const context = browser.defaultBrowserContext();
  const page = await browser.newPage();
  await context.overridePermissions("https://www.google.fr/", ["geolocation"]);
  await page.setGeolocation({ latitude: 45.764043, longitude: 4.835659 });
  await page.goto(`https://www.google.fr/search?q=${search}&hl=fr`);
  // await page.click("#L2AGLb > div"); // RETIRÉ car ne fonctionne pas sur tous les serveurs
  await page.click("span.hqzQac > span > a > span");
  console.log("Lancement du timeout");
  await page.waitForTimeout(1500);
  console.log("Timeout fini");
  const avis = await page.evaluate(() => {
    let reviews = [];
    let name = document.querySelector(".Lhccdd > div").textContent;
    let number_rating = document.querySelector("span.z5jxId").textContent;
    let rating = document.querySelector("span.Aq14fc").textContent;
    let elements = document.querySelectorAll(
      "div.WMbnJf.vY6njf.gws-localreviews__google-review"
    );
    for (element of elements) {
      let ratingConverse = String(
        element.querySelector("span.lTi8oc.z3HNkc").getAttribute("aria-label")
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
