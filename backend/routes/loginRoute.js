const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

const User = require("../models/userModel");
dotenv.config();
const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  console.log(user);
  if (user) {
    try {
      success = await bcrypt.compare(password, user.password);
      console.log(success);
      if (success) {
        const token = jwt.sign(
          { id: user._id, name: user.name },
          process.env.TOKEN_SECRET
        );

        return res.json(token);
      }
    } catch (error) {
      return res.status(400).send(error);
    }
  } else {
    return res.status(400).send("invalid email or password");
  }
});

module.exports = router;
