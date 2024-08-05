const mongoose = require("mongoose");

const eventsSchema = new mongoose.Schema({
  eventTitle: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
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
  seats: {
    type: Number,
    required: true,
  },
  description: { type: String,required: true },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("events", eventsSchema);
