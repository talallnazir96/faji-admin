const Event = require("../models/events_model");
const User = require("../models/user_model");
const path = require("path");
const eventValidationSchema = require("../validators/event_Validators");
const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// *****************
// Get All  events
// *****************

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("organizer", "firstName lastName") // Populate with user's name
      .exec();
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
    const event = await Event.findById(req.params.id)
      .populate({
        path: "organizer",
        select: "firstName lastName", // Only select the 'name' field from the User model
      })
      .exec();
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
  console.log('Session user ID:', req.session.userId); // Debug log
  console.log('Event data:', req.body); // Debug log

  console.log('Files:', req.files); // Debug log
  //  Event validation
  // const { error } = eventValidationSchema.validate(req.body);
  // if (error) return res.status(400).json({ error: error.details[0].message });
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  }
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
 
  const {
    eventTitle,
    date,
    time,
    seats,
    location,
    price,
    description,
    images,
  } = req.body;
  const imageUrls = req.files.map(file => `${req.protocol}://${req.get('host')}/uploads/${path.basename(file.path)}`);
  // If no image files are uploaded and no image URL is provided
  if (imageUrls.length === 0) {
    return res.status(400).json({
      message: "At least one image is required, either as a file upload or an image URL.",
    });
  }

  const newEvent = await new Event({
    eventTitle,
    date,
    time,
    seats,
    location,
    price,
    organizer: req.session.userId,
    description,
    images: imageUrls,
  });

  try {
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    console.error("Error creating event:", err);
    res
      .status(500)
      .json({ error: "Error creating event", details: err.message });
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
    })
      .populate({
        path: "organizer",
        select: "firstName lastName", // Only select the 'name' field from the User model
      })
      .exec();

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
