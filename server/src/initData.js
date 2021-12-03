const axios = require("axios");

const initData = async () => {
  try {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );
    console.log("JSON PLACEHOLDER SUCCESS: ", "Data is loaded");
    return data;
  } catch (err) {
    console.error("JSON PLACEHOLDER ERROR: ", err.message);
    process.exit(1);
  }
};

module.exports = { initData };
