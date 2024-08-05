const Notification = require("../models/notification_model");

// ************
// Get All notification
// ****************

exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (error) {
    res.status(400).json("error");
  }
};

// *********************
// Get notification by ID
// **********************
exports.getNotificationById = async (req, res) => {
  const { notification_id } = req.params;
  console.log(notification_id);
  try {
    const notification = await Notification.findOne({
      notification_id: notification_id,
    });
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.status(200).json(notification);
  } catch (err) {
    console.error("Error fetching notification:", err);
    res
      .status(500)
      .json({ error: "Error fetching notification", details: err.message });
  }
};

// ************
// Add notification
// ****************

exports.addNotification = async (req, res) => {
  const { notification_id, title, date, type, description } = req.body;
  const newNotification = await new Notification({
    notification_id,
    title,
    date,
    type,
    description,
  });
  try {
    const savedNotification = await newNotification.save();
    res.json(savedNotification);
  } catch (error) {
    res.json(error);
  }
};

// ******************
// upadte notification
// ********************

exports.updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const updatedData = req.body;
    const notification = await Notification.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.status(200).json({ message: "Notification updated", notification });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating Notification", details: error.message });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    await Notification.findByIdAndDelete(id);
    res.status(200).json({ message: "Notification deleted" });
  } catch (err) {
    console.error("Error deleting notification:", err);
    res
      .status(500)
      .json({ error: "Error deleting notification", details: err.message });
  }
};
