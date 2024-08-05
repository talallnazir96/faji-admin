const User = require("../models/user_model");


// **********
// Get Users
// *********
exports.getAllUsers = async(req,res)=>{
    try {
        const users = await User.find();
        res.json(users);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}
// *******************
// Get User by userid
// *******************
exports.getUserById =async(req,res)=>{
    const { userId }  = req.params;
    console.log(userId);
    try {
      const user = await User.findOne({ userId: userId});
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ error: 'Error fetching user', details: err.message });
    }
}
// **********
// Add User
// *********
exports.addUser = async (req, res) => {
  const {
    userId,
    userName,
    email,
    password,
    registrationDate,
    userRole,
    status,
    ticketsPurchased,
  } = req.body;
  const newUser = await new User({
    userId,
    userName,
    email,
    password,
    registrationDate,
    userRole,
    status,
    ticketsPurchased,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).json({ error: "Error adding user", details: err.message });
  }
};

// **********
// update User
// ***********
 exports.updateUser = async(req,res)=>{
    try {
        const userId = req.params.id;
        const updatedData = req.body;
        const user = await User.findByIdAndUpdate(userId, updatedData, {
          new: true,
        });
        res.status(200).json({ message: "User updated", user});
      } catch (error) {
        res.status(500).json({ error: "Error updating user" });
      }

 }
// **********
// delete User
// ***********
exports.deleteUser =async(req,res)=>{
    try {
        const userId = req.params.id;
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: "User deleted" });
      } catch (error) {
        console.error("Error creating User:", err);
        res
          .status(500)
          .json({ error: "Error creating user", details: err.message });
      }
}
