require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connectDb = require("./utils/db");
const blogRoutes = require("./router/blog-route");
const eventsRoutes = require("./router/events_route");
const ticketsRoutes = require("./router/tickets_route");
const promocodeRoutes = require("./router/promocode_route");
const authRoutes = require("./router/auth_route");
const userRoutes = require("./router/user_route");
const settingsRoutes = require("./router/settings_route");
const logsRoutes = require("./router/auditLogs_route");
const reportsRoutes = require("./router/report_route");
const emailsRoutes = require("./router/emailTemplate_route");
const notificationsRoutes = require("./router/notification_route");
const errorMiddleware = require("./middlewares/error-middleware");
const Notification = require("./models/sendNotification_model");
const socketIo = require("socket.io");
const http = require("http");
const cors = require("cors");
const PORT = 5000;
const server = http.createServer(app);
// console.log(server);
const io = socketIo(server);
//MiddleWare
app.use(cors());
app.use(express.json());
app.use(errorMiddleware);

app.use(bodyParser.json());
//Routes

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

app.use("/api/events", eventsRoutes);

app.use("/api/promo", promocodeRoutes);

app.use("/api/tickets", ticketsRoutes);

app.use("/api/users", userRoutes);

app.use("/api/settings", settingsRoutes);

app.use("/api/audits", logsRoutes);

app.use("/api/reports", reportsRoutes);

app.use("/api/email-templates", emailsRoutes);

app.use("/api/app-notifications", notificationsRoutes);
// Handle client connection
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
app.post("/api/app-notifications/send-notification/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const { notification_id, title, date, type, description } = req.body;
    // 1. Log notification received
    console.log("Notification received:", {
      notification_id,
      title,
      date,
      type,
      description,
    });

    // Send notification via socket.io
    io.emit("receiveNotification", { title, description });
    console.log("Notification sent to clients via Socket.io.");



    // Save notification to the database
    const notification = new Notification({
      id: req.params,
      notification_id,
      title,
      date,
      type,
      description,
    });

    const savedNotification = await notification.save();
    // Respond with the saved notification
    // res.status(201).json(savedNotification);
    console.log("Notification saved to database.");


    //  Send response back to client
    res
      .status(201)
      .json({ message: "Notification sent and saved successfully" });
    
  } catch (error) {
    console.error("Error sending or saving notification:", error);
    res.status(500).json({ message: "Error sending or saving notification",details:error.message });
  }
});

//Connection with DB

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
