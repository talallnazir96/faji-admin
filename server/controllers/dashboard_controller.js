const Ticket = require("../models/tickets_model");

exports.totalRevenue = async (req, res) => {
  try {
    const totalRevenue = await Ticket.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: {
              $toDouble: {
                $substr: [
                  "$price",
                  0,
                  { $subtract: [{ $strLenCP: "$price" }, 1] },
                ],
              },
            },
          },
        },
      },
    ]);
    const revenue = totalRevenue.length > 0 ? totalRevenue[0].total : 0;
    res.json({ totalRevenue: revenue });
  } catch (error) {
    console.error("Error calculating total revenue:", error);
    res.status(500).json({ error: "Server error" });
  }
};
