const Ticket = require("../models/tickets_model");
const User = require("../models/user_model");
const Event = require("../models/events_model");
const ticketValidationSchema = require("../validators/tickets_Validators");
const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// *************
// Get All Ticket
// *************
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    const formattedTicketDate = tickets.map((ticket) => ({
      ...ticket._doc,
      purchasedDate: formatDate(ticket.purchasedDate), // Format as mm/dd/yyyy
    }));
    return res.json(formattedTicketDate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// *************
// Create Ticket
// *************
exports.createTicket = async (req, res) => {
  const {
    userId,
    eventId,
    ticketId,
    partyName,
    userName,
    purchasedDate,
    price,
    promoCode,
  } = req.body;
  const newTicket = await new Ticket({
    userId,
    eventId,
    ticketId,
    partyName,
    userName,
    purchasedDate,
    price,
    promoCode,
  });

  try {
    await newTicket.save();
    const ticketCount = await Ticket.countDocuments({ userId: userId });

    // Update the user's ticketsPurchased count
    await User.findOneAndUpdate(
      { userId: userId },
      { ticketsPurchased: ticketCount } // Set ticketsPurchased to the current count
    );

    res.status(201).json(newTicket);
  } catch (err) {
    console.error("Error creating ticket:", err);
    res
      .status(500)
      .json({ error: "Error creating ticket", details: err.message });
  }
};
// *******************
// Get Ticket by id
// *******************
exports.getTicketById = async (req, res) => {
  const { ticketId } = req.params;
  console.log(ticketId);
  try {
    const ticket = await Ticket.findOne({ ticketId: ticketId });

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    const event = await Event.findById(ticket.eventId);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json({
      ...ticket.toObject(),
      organizerName: event.event_organizer, // Directly using the string field
    });
  } catch (err) {
    console.error("Error fetching ticket:", err);
    res
      .status(500)
      .json({ error: "Error fetching ticket", details: err.message });
  }
};
