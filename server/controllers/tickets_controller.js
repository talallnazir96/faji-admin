const Ticket = require("../models/tickets_model");
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
  // TICKET validation
  const { error } = ticketValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { ticketId, partyName, userName, purchasedDate, price, promoCode } =
    req.body;
  const newTicket = await new Ticket({
    ticketId,
    partyName,
    userName,
    purchasedDate,
    price,
    promoCode,
  });

  try {
    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);
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
    res.status(200).json(ticket);
  } catch (err) {
    console.error("Error fetching ticket:", err);
    res
      .status(500)
      .json({ error: "Error fetching ticket", details: err.message });
  }
};
