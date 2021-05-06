const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

const User = require("../models/userModel");
dotenv.config();
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    const user = await User.create({
      name: name,
      email: email,
      password: password,
    });

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.TOKEN_SECRET
    );

    return res.json(token);
  } catch (err) {
    return res.status(404).json("email already used");
  }
});

module.exports = router;
