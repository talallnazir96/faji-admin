const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  ID: {
    type: Number,
    required: true,
  },
  timeStamp: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },

  eventname: {
    type: String,
    required: true,
  },
  eventId: {
    type: Number,
    required: true,
  },
  action:{
    type:String,
    action: { type: String, default: "Marked as Spam" }, //Marked as Spam,Request info,Declined
  },
  requestedDetails:{
    type:String,
    required: true
  }
});
module.exports = mongoose.model("reports", reportSchema);
