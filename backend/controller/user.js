const User = require("../models/user");
const bcrypt = require("bcrypt");

// Function to handle user signup
async function handleUserSignUp(req, res) {
  try {
    const {
      fname,
      mname,
      lname,
      suffix,
      addr1,
      addr2,
      country,
      city,
      state,
      zipcode,
      email,
      password,
    } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const user = await User.create({
      fname,
      mname,
      lname,
      suffix,
      addr1,
      addr2,
      country,
      city,
      state,
      zipcode,
      email,
      password: hashedPassword,
    });

    // Send success response
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    // Send error response
    res.status(400).json({ message: "Error creating user", error });
  }
}

// Function to handle user signin
async function handleUserSignin(req, res) {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    // Return success response
    res.status(200).json({ message: "Signin successful", user });
  } catch (error) {
    // Send error response
    res.status(400).json({ message: "Error signing in", error });
  }
}

module.exports = { handleUserSignUp, handleUserSignin };
