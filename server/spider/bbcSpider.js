const cheerio = require("cheerio");
const axios = require("axios");

module.exports = async (query) => {
  let response = await axios.get(`https://www.bbc.co.uk/search?q=${query}`);
  let $ = cheerio.load(response.data);
  let script = $("script")
    .toArray()
    .map((el) => {
      return $(el).html();
    })
    .filter((el) => {
      return el.includes("window.__INITIAL_DATA__");
    });
  jsonData = script[0].replace("window.__INITIAL_DATA__=", "");
  jsonData = JSON.parse(jsonData.replace(jsonData.substr(-1), ""));
  let keys = [];
  for (let key in jsonData.data) {
    keys.push(key);
  }
  data = jsonData.data[keys[1]].data.initialResults.items;
  data = data.map((el) => {
    return {
      url: el.url,
      headline: el.headline,
      description: el.description,
      image: el.image.src,
    };
  });
  return data;
};
