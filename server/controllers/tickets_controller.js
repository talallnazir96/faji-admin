const Ticket = require("../models/tickets_model");
const ticketValidationSchema = require("../validators/tickets_Validators");


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
    const { ticketId }  = req.params;
    console.log(ticketId);
    try {
      const ticket = await Ticket.findOne({ticketId: ticketId});
      if (!ticket) {
        return res.status(404).json({ error: 'Ticket not found' });
      }
      res.status(200).json(ticket);
    } catch (err) {
      console.error('Error fetching ticket:', err);
      res.status(500).json({ error: 'Error fetching ticket', details: err.message });
    }
  };
