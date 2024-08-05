const express = require('express');
const router = express.Router();
const reportsController = require("../controllers/reports_controller");

router.route('/').post(reportsController.createReport);

router.route('/').get(reportsController.getReports);
module.exports = router;