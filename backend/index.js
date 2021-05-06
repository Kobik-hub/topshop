const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//Import Middlewares
const auth = require("./middleware/auth");

//Import routes
const productRoutes = require("./routes/productRoutes");
const loginRoute = require("./routes/loginRoute");
const registerRoute = require("./routes/registerRoute");
const orderRoute = require("./routes/orderRoute");
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
// app.use(auth);
app.use("/api/login", loginRoute);
app.use("/api/register", registerRoute);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoute);

app.get("/", (req, res) => {
  res.send("Api is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server runing in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
