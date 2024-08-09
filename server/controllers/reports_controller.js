const Report = require("../models/reports_model");

// ***************
// Create Report
// ***************

exports.getReports = async (req, res) => {
  try {
    const report = await Report.find();
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ***************
// Create Report
// ***************

exports.createReport = async (req, res) => {
  const { ID, timeStamp, description, userId, username, eventname, eventId } =
    req.body;
  const newReport = await new Report({
    ID,
    timeStamp,
    description,
    userId,
    username,
    eventname,
    eventId,
  });
  try {
    const savedReport = await newReport.save();
    res.status(200).json(savedReport);
  } catch (err) {
    console.error("Error creating reports:", err);
    res
      .status(500)
      .json({ error: "Error creating reports", details: err.message });
  }
};

// ********************
// Event Marked as Spam
// ********************
exports.spamEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const report = await Report.findByIdAndUpdate(
      eventId,
      { action: "Marked as Spam" },
      { new: true }
    );
    res.status(200).json({ message: "Event Marked as Spam", report });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error marked as spam event", details: error.message });
  }
};
// ********************
// Event Declined
// ********************

exports.declineEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    console.log(id);
    const report = await Report.findByIdAndUpdate(
      id,
      { action: "Declined", reason },
      { new: true }
    );
    res.status(200).json({ message: "Event declined", report });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error declining event", details: error.message });
  }
};

exports.requestInfo = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { requestedDetails } = req.body;

    const report = await Report.findByIdAndUpdate(
      id,
      {action:"Request Info"},
      { requestedDetails:requestedDetails},
      { new: true }
    );
    res.status(200).json({ message: "Information requested successfully", report });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error requesting information", details: error.message });
  }
};
