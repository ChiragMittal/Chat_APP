const moment = require("moment");

const generateLocationMessage = (from, lat, lng) => {
    return {
      from,
      url: `https://www.google.com/maps?q=${lat},${lng}`,
      createdAt: moment().valueOf()
    };
  };
  
  module.exports = { generateLocationMessage };