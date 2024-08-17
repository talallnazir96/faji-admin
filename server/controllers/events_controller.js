const Event = require("../models/events_model");
const User = require("../models/user_model");
const path = require("path");
const fs = require("fs");
const eventValidationSchema = require("../validators/event_Validators");
const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};



// Define the upload directory
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
// *****************
// Get All  events
// *****************

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    const formattedEventDate = events.map((event) => ({
      ...event._doc,
      date: formatDate(event.date), // Format as mm/dd/yyyy
    }));
    return res.json(formattedEventDate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// *****************
// Get Event By Id
// *****************

exports.getEventById = async (req, res) => {
  // const { id } = req.params;

  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(event);
  } catch (err) {
    console.error("Error fetching event:", err);
    res
      .status(500)
      .json({ error: "Error fetching event", details: err.message });
  }
};
// *****************
// Create events
// *****************

exports.createEvent = async (req, res) => {
  try {
    // Check if files were uploaded
    if (!req.files || !req.files.image) {
      return res.status(400).send('No files were uploaded.');
    }
    
    const image = req.files.image;
    const filePath = path.join(uploadDir, image.name);

    // Save the file to the server directory
    image.mv(filePath, async (err) => {
      if (err) {
        return res.status(500).send(err);
      }
      
      // Construct the URL for the uploaded image
      const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${path.basename(filePath)}`;

      // Extract event details from request body
      const {
        eventId,
        eventTitle,
        date,
        time,
        seats,
        location,
        price,
        description,
        event_organizer
      } = req.body;

      // Create a new event with the uploaded image URL
      const newEvent = new Event({
        eventId,
        eventTitle,
        date,
        time,
        seats,
        location,
        price,
        description,
        images: [imageUrl], // Assuming `images` is an array of URLs
        event_organizer,
      });

      try {
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
      } catch (err) {
        console.error("Error creating event:", err);
        res.status(500).json({ error: "Error creating event", details: err.message });
      }
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }

};

// *****************
// Update event status
// *****************

exports.updatedEventStatus = async (req, res) => {
  try {
    const { status } = req.body;
    console.log(status);
    const eventId = req.params.id;
    const event = await Event.findByIdAndUpdate(
      eventId,
      { status },
      { new: true }
    );
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Event status updated", event });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// exports.needInfo = async (req, res) => {
//   try {
//     const eventId = req.params.id;
//     const event = await Event.findByIdAndUpdate(
//       eventId,
//       { status: "req_info" },
//       { new: true }
//     );
//     res.status(200).json({ message: "Event need info ", event });
//   } catch (error) {
//     res.status(500).json({ error: "Error event need info" });
//   }
// };

// *****************
// Decline Event
// *****************

// exports.declineEvent = async (req, res) => {
//   try {
//     const eventId = req.params.id;
//     const { reason } = req.body;

//     const event = await Event.findByIdAndUpdate(
//       eventId,
//       { status: "declined", reason },
//       { new: true }
//     );
//     res.status(200).json({ message: "Event declined", event });
//   } catch (error) {
//     res.status(500).json({ error: "Error declining event" });
//   }
// };

// *****************
// Update Event
// *****************

exports.updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const updatedData = req.body;
    const event = await Event.findByIdAndUpdate(eventId, updatedData, {
      new: true,
    });

    res.status(200).json({ message: "Event updated", event });
  } catch (error) {
    res.status(500).json({ error: "Error updating event" });
  }
};

// *****************
// Delete Event
// *****************

exports.deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    await Event.findByIdAndDelete(eventId);
    res.status(200).json({ message: "Event deleted" });
  } catch (error) {
    console.error("Error deleting event:", err);
    res
      .status(500)
      .json({ error: "Error deleting event", details: err.message });
  }
};

// *******************************
// GET /api/events?status=upcoming
// *******************************
exports.eventsStatus = async (req, res) => {
  const { status } = req.query;
  try {
    if (status === "upcoming") {
      events = await Event.find({ date: { $gte: new Date() } });
    } else if (status === "expired") {
      events = await Event.find({ date: { $lt: new Date() } });
    } else {
      events = await Event.find({});
    }

    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// *******************************
// Events Stats
// *******************************
exports.eventsStats = async (req, res) => {
  try {
    const totalTicketsSold = await User.aggregate([
      { $group: { _id: null, total: { $sum: "$ticketsPurchased" } } },
    ]);

    res.status(200).json({
      totalTicketsSold: totalTicketsSold[0]?.total || 0,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// ******************
// get total seats
// *****************

exports.totalSeats = async (req, res) => {
  try {
    const totalSeats = await Event.aggregate([
      { $group: { _id: null, totalSeats: { $sum: "$seats" } } },
    ]);
    console.log(totalSeats);
    res.status(200).json({ totalSeats: totalSeats[0]?.totalSeats || 0 });
  } catch (err) {
    console.error("Error fetching total seats:", err);
    res
      .status(500)
      .json({ message: "Error fetching total seats", details: err.message });
  }
};
