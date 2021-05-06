const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const User = require("../models/userModel");

// New Order
router.post("/", async (req, res) => {
  try {
    const { user, orderItems, shippingAddress, totalPrice } = req.body;
    const success = await Order.create({
      user: user,
      orderItems: orderItems,
      shippingAddress: shippingAddress,
      totalPrice: totalPrice,
    });
    res.send(success._id);
  } catch (error) {
    console.log(error);
    res.status("404").send(error.message);
  }
});

///get all orders for specific user
router.get("/:userId", async (req, res) => {
  console.log(req.params.userId);

  try {
    const userId = req.params.userId;

    const user = await User.findOne({ _id: userId });
    if (!user) return res.status(404).send("User not exist");

    const orders = await Order.find({ "user.id": userId });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status("404").send(error.message);
  }
});

module.exports = router;
