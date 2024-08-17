const express = require("express");

const router = express.Router();

const ticketsController = require("../controllers/tickets_controller");

router.route("/").get( ticketsController.getAllTickets);
router.route("/").post( ticketsController.createTicket);

router.route("/:ticketId").get( ticketsController.getTicketById);
module.exports = router;