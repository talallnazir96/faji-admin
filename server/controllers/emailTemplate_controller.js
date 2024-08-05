const Email = require("../models/email_model");

// *********************
// Get Email Template
// *********************
exports.getEmailTemplate = async (req, res) => {
  try {
    const emailTemplate = await Email.find();
    res.json(emailTemplate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// *********************
// Get Email Template by id
// *********************
exports.getEmailTemplateById = async (req, res) => {
  const {emailId} = req.params;
  console.log(emailId);
  try {
    const emailTemplate = await Email.findOne({emailId:emailId});
    if (!emailTemplate) {
      return res.status(404).json({ error: 'Email not found' });
    }
    res.status(200).json(emailTemplate);
  } catch (err) {
    console.error('Error fetching email:', err);
    res.status(500).json({ error: 'Error fetching email', details: err.message });
  }
};
// *********************
// Create Email Template
// *********************
exports.createEmail = async (req, res) => {
  const {emailId, name, subject, body, type } = req.body;
  const newEmail = await new Email({
    emailId,
    name,
    subject,
    body,
    type,
  });
  try {
    const savedEmail = await newEmail.save();
    res.status(200).json(savedEmail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// *********************
// Update Email Template
// *********************
exports.updateEmailTemplate= async(req,res)=>{
  try {
    const {id} = req.params;
    console.log(id);
    const updatedData = req.body;
    const emailTemplate = await Email.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.status(200).json({ message: "Email Template updated", emailTemplate });
  } catch (error) {
    res.status(500).json({ error: "Error updating email template" });
  }
}


// *********************
// Delete Email Template
// *********************
exports.deleteEmailTemplate= async(req,res)=>{
  try {
    const {id} = req.params;
    await Email.findByIdAndDelete(id);
    res.status(200).json({ message: "Email deleted" });
  } catch (err) {
    console.error("Error creating email:", err);
    res
      .status(500)
      .json({ error: "Error deleting email", details: err.message });
  }
}

