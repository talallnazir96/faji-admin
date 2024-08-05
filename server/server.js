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
const cors = require("cors");
const PORT = 5000;
// const webpush = require('web-push');

// const vapidKeys = webpush.generateVAPIDKeys();
// console.log(vapidKeys);
// webpush.setVapidDetails(
//   'mailto:asmasiddique@gmail.com',
//   'BBTVrh3ew_SR34r-qbv50Z8It1OuLlrGzo8hpvBbgA9YxqCs-i6pLQFVTsxu8pU5S6ycgNpL6J-6mV9CHW3OEj0',
//   'aT0JvegMelIqz96Fn03XjlN0DKKVkLAQ6GVH6OeYA7s'
// );
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


//Connection with DB

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
