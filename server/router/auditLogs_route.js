const express = require('express');

const router = express.Router();

const logController = require("../controllers/auditLogs_controller");

router.route("/").get( logController.getAuditLogs);


router.route("/").post(logController.createAuditLogs);

module.exports = router;