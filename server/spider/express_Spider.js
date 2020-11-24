const cheerio = require("cheerio");
const axios = require("axios");
module.exports = async (query) => {
  let response = await axios.get(`https://www.express.co.uk/search?s=${query}`);
  let $ = cheerio.load(response.data);
  result_divs = $(".search-results .result-item").toArray();
  results = result_divs.map((el) => {
    let detailsLinks = "https://www.express.co.uk" + $(el).attr("href");
    let $$ = cheerio.load($(el).html());
    let heading = $$(".post-title").text();
    let description = $$(".post-content p:nth-child(3)").text();
    let image = $$(".post-content .lazy-container picture img").attr("src");

    return {
      url: detailsLinks,
      heading: heading,
      description: description,
      image: image,
    };
  });
  return results;
};
