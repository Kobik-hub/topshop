const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");

// Fetch all products
router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// Fetch single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (Product) {
      res.json(product);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
