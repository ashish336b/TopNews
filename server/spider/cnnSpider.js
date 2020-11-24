const axios = require("axios");

module.exports = async (query) => {
  const response = await axios.get(
    `https://search.api.cnn.io/content?q=${query}&size=10`
  );
  data = response.data.result.map((el) => {
    return {
      url: el.url,
      heading: el.headline,
      description: el.body.split(" ").slice(0, 40).join(" "),
      image: el.thumbnail,
    };
  });
  return data;
};
