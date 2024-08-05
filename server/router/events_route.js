const express = require("express");

const router = express.Router();

const eventsController = require("../controllers/events_controller");

router.route("/").get( eventsController.getAllEvents);

router.route("/:id").get( eventsController.getEventById);

router.route("/").post( eventsController.createEvent);

router.route("/:id/approve").put(eventsController.approveEvent);

router.route("/:id/decline").put(eventsController.declineEvent);

router.route("/update-event/:id").put(eventsController.updateEvent);

router.route("/:id").delete(eventsController.deleteEvent);

module.exports = router;