const axios = require("axios");
const cheerio = require("cheerio");
class Proxy {
  constructor(url) {
    this.url = url;
  }

  async fetchProxy() {
    let html_response = await axios.get(this.url);
    let $ = cheerio.load(html_response.data);
    let proxyList = $(".modal-body textarea").text();
    proxyList = proxyList.replace(/\n/g, "***").split("***");
    proxyList = proxyList
      .filter((el) => {
        let regex = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}:[0-9]+/;
        if (regex.test(el)) return el;
      })
      .map((el) => {
        return el.split(":");
      });
    return proxyList;
  }
}

module.exports = Proxy;
