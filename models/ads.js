const mongoose = require("mongoose");

const AdsSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
});

const Ads = mongoose.model("Ads", AdsSchema);

module.exports = Ads;
