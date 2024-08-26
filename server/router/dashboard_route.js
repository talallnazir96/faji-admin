const express = require("express");

const router = express.Router();

const dashboardController = require("../controllers/dashboard_controller");

router.route("/totalRevenue").get(dashboardController.totalRevenue);

module.exports = router;