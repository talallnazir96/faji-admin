const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require('path');
const fs = require('fs');
const eventsController = require("../controllers/events_controller");
// const isAuthenticated = (req, res, next) => {
//   if (req.session.userId) {
//     next(); // User is authenticated
//   } else {
//     res.status(401).json({ message: "Unauthorized" }); // User is not authenticated
//   }
// };
const uploadDir = path.join(__dirname, 'router/uploads');

// Function to check and create directory
const checkAndCreateUploadDir = () => {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('Uploads directory created');
  } else {
    console.log('Uploads directory already exists');
  }
};
checkAndCreateUploadDir();
// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });
router.route("/").get(eventsController.getAllEvents);

router.route("/total-seats").get(eventsController.totalSeats);

router.route("/stats").get(eventsController.eventsStats);

router.route("/:id").get(eventsController.getEventById);

// router.post('/create-event', upload.array('images', 10), (req, res, next) => {
//     if (!req.files) {
//       return res.status(400).json({ message: 'No files uploaded' });
//     }
//     next();
//   },  eventsController.createEvent);
router.route("/").post(upload.array("images", 5), eventsController.createEvent);

router.route("/:id/status").put(eventsController.updatedEventStatus);

// router.route("/:id/decline").put(eventsController.declineEvent);

// router.route("/:id/needInfo").put(eventsController.needInfo);

router.route("/update-event/:id").put(eventsController.updateEvent);

router.route("/:id").delete(eventsController.deleteEvent);

router.route("/?status").get(eventsController.eventsStatus);

module.exports = router;
