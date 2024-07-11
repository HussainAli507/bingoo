// const User = require("../models/user");
// const bcrypt = require("bcrypt");

// async function handleUserSignUp(req, res) {
//   try {
//     const {
//       fname,
//       mname,
//       lname,
//       suffix,
//       addr1,
//       addr2,
//       country,
//       city,
//       state,
//       zipcode,
//       email,
//       password,
//     } = req.body;

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       fname,
//       mname,
//       lname,
//       suffix,
//       addr1,
//       addr2,
//       country,
//       city,
//       state,
//       zipcode,
//       email,
//       password: hashedPassword,
//     });

//     res.status(201).json({ message: "User created successfully", user });
//   } catch (error) {
//     res.status(400).json({ message: "Error creating user", error });
//   }
// }

// async function handleUserSignin(req, res) {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid Password" });
//     }

//     res.status(200).json({ message: "Signin successful", user });
//   } catch (error) {
//     res.status(400).json({ message: "Error signing in", error });
//   }
// }

// module.exports = { handleUserSignUp, handleUserSignin };
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET_KEY;

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

    const hashedPassword = await bcrypt.hash(password, 10);
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

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
  }
}

async function handleUserSignin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, secretKey, {
      expiresIn: process.env.JWT_EXPRESS,
    });
    res.status(200).json({ message: "Signin successful", token });
  } catch (error) {
    res.status(400).json({ message: "Error signing in", error });
  }
}

module.exports = { handleUserSignUp, handleUserSignin };
