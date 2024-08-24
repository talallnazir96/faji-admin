const Logs = require("../models/auditLogs_model");
const logsValidationSchema = require("../validators/auditLogs_Validators");
const User = require("../models/auth_model");
exports.getAuditLogs = async (req, res) => {
  try {
    const logs = await Logs.find().sort({ timeStamp: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAuditLogs = async (req, res) => {
  // const { error } = logsValidationSchema.validate(req.body);
  // if (error) return res.status(400).json({ error: error.details[0].message });

  const {action, ID, timeStamp, userId, userName, changes } = req.body;
  const newLogs = await new Logs({
    action,
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
// exports.updateUser = async (req, res) => {
//   const { userId, changes } = req.body;

//   try {
 
//     const updatedUser = await User.findByIdAndUpdate(userId, changes, {
//       new: true,
//     });

    
//     await createAuditLogs({
//       ID: updatedUser._id,
//       timeStamp: new Date(),
//       userId: updatedUser._id,
//       userName: updatedUser.username,
//       changes: changes,
//     });

//     res.status(200).json(updatedUser);
//   } catch (err) {
//     console.error("Error updating user:", err);
//     res
//       .status(500)
//       .json({ error: "Error updating user", details: err.message });
//   }
// };
