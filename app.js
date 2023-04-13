const express = require("express");
const dotenv = require("dotenv").config();
const ejs = require("ejs");
const multer = require("multer");
const cors = require("cors");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoDBStore = require("connect-mongodb-session")(session);
const bcrypt = require("bcrypt");

const dashboardRouter = require("./routes/dashboard");

const Employee = require("./models/employee");
const Rate = require("./models/rate");
const Ads = require("./models/ads");

const app = express();
// Set up middleware
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure app to use EJS as the template engine
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
);

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});

app.use("/dashboard", dashboardRouter);

app.get("/", async (req, res) => {
  let members = await Employee.find();
  let rating = await Rate.find();
  let ads = await Ads.find();
  res.render("index", { members, rating, ads });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log(err);
  });
// app.listen(process.env.PORT || 3000);
