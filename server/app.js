const express = require("express");
const app = express();
const port = 3000;
const bbcSpider = require("./spider/bbcSpider");
const cnnSpider = require("./spider/cnnSpider");
const express_spider = require("./spider/express_Spider");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");

  next();
});

app.get("/", async (req, res) => {
  try {
    let noOfData = 8;
    const cnnNews = await cnnSpider(req.query.q);
    const bbcNews = await bbcSpider(req.query.q);
    const expressNews = await express_spider(req.query.q);
    res.json({
      cnnNews: cnnNews.slice(0, noOfData),
      bbcNews: bbcNews.slice(0, noOfData),
      expressNews: expressNews.slice(0, noOfData),
    });
  } catch (error) {
    console.log(error);
    res.json({
      cnnNews: null,
      bbcNews: null,
      expressNews: null,
    });
  }
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
