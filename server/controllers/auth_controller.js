const User = require("../models/auth_model");
const bcrypt = require("bcrypt");
const authValidationSchema = require("../validators/auth_validators");

// *******************
// SIGN UP LOGIC
// *******************

exports.signUp = async (req, res) => {
  const { error } = authValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  const {
    phoneNo,
    firstName,
    lastName,
    email,
    password,
    pushNotificationsEnabled,
  } = req.body;
  try {
    // Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 12);

    const userCreated = await User.create({
      phoneNo,
      firstName,
      lastName,
      email,
      password,
      pushNotificationsEnabled,
    });
    console.log(userCreated);
    const token = await userCreated.generateToken();
    if (!token) {
      return res.status(500).json({ message: "Failed to generate token" });
    }
    res.status(201).json({
      msg: userCreated,
      token,
      userId: userCreated._id.toString(),
    });
  } catch (err) {
    console.error("registration error:", err);
    res.status(500).json({ error: "Error ", details: err.message });
  }
};
// *******************
// SIGN IN LOGIC
// *******************
exports.signIn = async (req, res) => {
  // const { error } = schema.validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  const { email, password } = req.body;
  console.log(email);

  try {
    // if (!email || !password) {
    //     return res.status(400).json({ message: 'All fields are required' });
    // }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = await user.generateToken();
    if (!token) {
      return res.status(500).json({ message: "Failed to generate token" });
    }
    res.status(201).json({
      msg: "login successfull",
      token,
      userId: user._id.toString(),
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// *******************
// Forget Password
// *******************

exports.forgetPassword = (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({email:email});
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    
  }
};
