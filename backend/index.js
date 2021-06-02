const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//Import Middlewares
const auth = require("./middleware/auth");
const path = require("path");

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

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api is running...");
  });
}

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server runing in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
