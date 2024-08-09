const Event = require("../models/events_model");
const User = require("../models/user_model");
const eventValidationSchema = require("../validators/event_Validators");

// *****************
// Get All  events
// *****************

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// *****************
// Get Event By Id
// *****************

exports.getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
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
  //  Event validation
  const { error } = eventValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { eventTitle, date, time, seats, location, price, description } =
    req.body;
  const newEvent = await new Event({
    eventTitle,
    date,
    time,
    seats,
    location,
    price,
    description,
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
// Approve Event
// *****************

exports.approveEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findByIdAndUpdate(
      eventId,
      { status: "approved" },
      { new: true }
    );
    res.status(200).json({ message: "Event approved", event });
  } catch (error) {
    res.status(500).json({ error: "Error approving event" });
  }
};

// *****************
// Decline Event
// *****************

exports.declineEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { reason } = req.body;

    const event = await Event.findByIdAndUpdate(
      eventId,
      { status: "declined", reason },
      { new: true }
    );
    res.status(200).json({ message: "Event declined", event });
  } catch (error) {
    res.status(500).json({ error: "Error declining event" });
  }
};

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
exports.eventsStats= async (req, res) => {
  try {
      const totalTicketsSold = await User.aggregate([{ $group: { _id: null, total: { $sum: '$ticketsPurchased' } } }]);

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

exports.totalSeats= async (req, res) => {
  try {
      const totalSeats = await Event.aggregate([
          { $group: { _id: null, totalSeats: { $sum: '$seats' } } }
      ]);
console.log(totalSeats);
      res.status(200).json({ totalSeats: totalSeats[0]?.totalSeats || 0 });
  } catch (err) {
    console.error('Error fetching total seats:', err);
    res.status(500).json({ message: 'Error fetching total seats', details: err.message });
  }
};