const mongoose = require("mongoose");

const employerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  job: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  facebookAcc: {
    type: String,
  },
  instagramAcc: {
    type: String,
  },
  protofolioLink: {
    type: String,
  },
});

const Employer = mongoose.model("Employer", employerSchema);

module.exports = Employer;
