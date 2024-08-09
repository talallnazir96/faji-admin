const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: {
    type: Number,
    
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  userRole:{
    type: String,
    default: "Organizer", // 'organizer', 'Admin', 'Attendee',

  },
  registrationDate:{
    type: Date,
  },
 
  status:{
    type: String,
    default: "active", // active, inActive
  },
  ticketsPurchased:{
    type: Number,
    required:true

  }
});

module.exports =  mongoose.model('Manageusers',UserSchema );