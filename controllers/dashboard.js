const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Rate = require("../models/rate");
const Employer = require("../models/employee");
const Ads = require("../models/ads");

exports.getLogin = (req, res) => {
  res.render("dashboard/index", { error: undefined });
};

exports.postLogin = async (req, res) => {
  try {
    // Check if user exists in database
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.render("dashboard/index", { error: "Invalid email or password" });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.render("dashboard/index", { error: "Invalid email or password" });
    }

    // Redirect to appropriate dashboard based on user role
    if (user.role === "admin") {
      // Set user data in session
      req.session.user = {
        id: user._id,
        email: user.email,
        role: user.role,
      };
      req.session.isLoggedIn = true;

      return res.redirect("/dashboard/employee");
    } else {
      return res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    res.render("dashboard/index", {
      error: "An error occurred while trying to login",
    });
  }
};

exports.getAds = async (req, res) => {
  let ads = await Ads.find();
  res.render("dashboard/ads", { ads });
};

exports.postAds = async (req, res) => {
  try {
    // Save the new employer to the database
    await Ads.create(req.body);

    // Send a success response
    res.status(201).redirect("/dashboard/ads");
  } catch (err) {
    // If there's an error, send an error response
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAds = async (req, res) => {
  try {
    const { adsId } = req.body;

    await Ads.deleteOne({ _id: adsId });

    // Send a success response
    res.status(201).redirect("/dashboard/ads");
  } catch (err) {
    // If there's an error, send an error response
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

exports.editAds = async (req, res) => {
  try {
    const { adsId } = req.body;
    console.log(req.body);
    await Ads.updateOne({ _id: adsId }, { ...req.body });

    // Send a success response
    res.status(201).redirect("/dashboard/ads");
  } catch (err) {
    // If there's an error, send an error response
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getEmployee = async (req, res) => {
  let emp = await Employer.find();
  res.render("dashboard/employee", { emp });
};

exports.postEmployee = async (req, res) => {
  try {
    console.log(req.body);

    const { name, job, image, facebookAcc, instagramAcc, protofolioLink } = req.body;

    // Create a new Employer object with the request body
    const newEmployer = new Employer({
      name,
      job,
      image,
      facebookAcc,
      instagramAcc,
      protofolioLink,
    });

    // Save the new employer to the database
    await newEmployer.save();

    // Send a success response
    res.status(201).redirect("/dashboard/employee");
  } catch (err) {
    // If there's an error, send an error response
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { empId } = req.body;

    await Employer.deleteOne({ _id: empId });

    // Send a success response
    res.status(201).redirect("/dashboard/employee");
  } catch (err) {
    // If there's an error, send an error response
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

exports.editEmployee = async (req, res) => {
  try {
    const { empId, name, image } = req.body;
    console.log(req.body);
    await Employer.updateOne({ _id: empId }, { name, image });

    // Send a success response
    res.status(201).redirect("/dashboard/employee");
  } catch (err) {
    // If there's an error, send an error response
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getRating = async (req, res) => {
  try {
    const rating = await Rate.find();
    res.render("dashboard/rating", { rating });
  } catch {}
};

exports.postRating = async (req, res) => {
  try {
    console.log(req.body);

    const { name, image } = req.body;

    // Create a new Employer object with the request body
    const newRate = new Rate({
      name,
      image,
    });

    // Save the new employer to the database
    await newRate.save();

    // Send a success response
    res.status(201).redirect("/dashboard/rating");
  } catch (err) {
    // If there's an error, send an error response
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteRating = async (req, res) => {
  try {
    const { RateId } = req.body;

    await Rate.deleteOne({ _id: RateId });

    // Send a success response
    res.status(201).redirect("/dashboard/rating");
  } catch (err) {
    // If there's an error, send an error response
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

exports.editRating = async (req, res) => {
  try {
    const { RateId, name, image } = req.body;
    console.log(req.body);
    await Rate.updateOne({ _id: RateId }, { name, image });

    // Send a success response
    res.status(201).redirect("/dashboard/rating");
  } catch (err) {
    // If there's an error, send an error response
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
