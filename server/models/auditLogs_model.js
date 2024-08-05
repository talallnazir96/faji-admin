const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const changeSchema = new Schema({
  old: {
    type: String,
    required: false,
  },
  new: {
    type: String,
    required: true,
  },
});
const auditLogSchema = new mongoose.Schema({
  ID: {
    type: Number,
    required: true,
  },
  timeStamp: {
    type: Date,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  changes: { username: changeSchema, email: changeSchema },
});
module.exports = mongoose.model("auditLogs", auditLogSchema);
