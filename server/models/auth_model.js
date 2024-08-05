const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  phoneNo: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  
  pushNotificationsEnabled: {
    type: Boolean,
    default: false,
  },
});



//? secure the password with the bcrypt
userSchema.pre("save", async function (next) {
  const user = this;
  // console.log("actual data ", this);

  if (!user.isModified) {
    return next();
  }

  try {
    const saltRound = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(user.password, saltRound);
    user.password = hashedPassword;
  } catch (error) {
    return next(error);
  }
});

//Compare Password
// userSchema.methods.comparePassword = async function(candidatePassword) {
//     if (!candidatePassword || !this.password) {
//       throw new Error("Data and hash arguments are required");
//     }
//     return await bcrypt.compare(candidatePassword, this.password);
//   };


// generate token JWT

userSchema.methods.generateToken = async function () {
  try {
    return await jwt.sign(
      { userId: this._id.toString() },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" }
    );
  } catch (error) {
    console.error("Error generating token:", error);
    return null; // Optionally return null or handle the error as needed
  }
};

module.exports = mongoose.model("User", userSchema);
