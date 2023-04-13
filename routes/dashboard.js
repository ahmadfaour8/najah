const express = require("express");
const dashboardController = require("../controllers/dashboard");
const isAdmin = require("../middleware/is-admin");

const router = express.Router();

router.get("/", dashboardController.getLogin);
//
router.get("/employee", isAdmin, dashboardController.getEmployee);

router.post("/employee", isAdmin, dashboardController.postEmployee);

router.post("/deleteEmployee", isAdmin, dashboardController.deleteEmployee);

router.post("/editEmployee", isAdmin, dashboardController.editEmployee);
//
router.get("/rating", isAdmin, dashboardController.getRating);

router.post("/rating", isAdmin, dashboardController.postRating);

router.post("/deleteRating", isAdmin, dashboardController.deleteRating);

router.post("/editRating", isAdmin, dashboardController.editRating);
//

router.get("/ads", isAdmin, dashboardController.getAds);

router.post("/ads", isAdmin, dashboardController.postAds);

router.post("/deleteAds", isAdmin, dashboardController.deleteAds);

router.post("/editAds", isAdmin, dashboardController.editAds);
//
router.post("/", dashboardController.postLogin);

module.exports = router;
