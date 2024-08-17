const mongoose = require("mongoose");

const eventsSchema = new mongoose.Schema({
  eventId: {
    type: Number,
    required: true,
  },
  eventTitle: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  event_organizer: {
    type: String,
    required: true,
  },
  date: { type: Date, required: true },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    status: { type: String, default: "pending" }, // 'pending', 'approved', 'declined'
  },

  reason: { type: String },
  images: {
    type: [String],
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  description: { type: String, required: true },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("events", eventsSchema);
