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
