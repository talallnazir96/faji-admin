const Logs = require("../models/auditLogs_model");
const logsValidationSchema = require("../validators/auditLogs_Validators");

exports.getAuditLogs = async (req, res) => {
  try {
    const logs = await Logs.find();
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAuditLogs = async (req, res) => {
  const { error } = logsValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { ID, timeStamp, userId, userName, changes } = req.body;
  const newLogs = await new Logs({
    ID,
    timeStamp,
    userId,
    userName,
    changes,
  });

  try {
    const savedLogs = await newLogs.save();
    res.status(201).json(savedLogs);
  } catch (err) {
    console.error("Error creating logs:", err);
    res
      .status(500)
      .json({ error: "Error creating logs", details: err.message });
  }
};
