const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const app = express();
const userRoute = require("./routes/user");
const menuRoute = require("./routes/menu");
const orderRoute = require("./routes/order");
const dashBoardRoute = require("./routes/dashboard");
const cookieParser = require("cookie-parser");
require("dotenv").config();

connectDb();

// meddleware setup
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    cookie: {
      sameSite: "none",
      secure: true,
    },
  })
);
app.use(cookieParser());
app.use(express.json());

// routes
app.use("/api/users", userRoute);
app.use("/api/menu", menuRoute);
app.use("/api/order", orderRoute);
app.use("/api/dashboard", dashBoardRoute);

app.all("*", (req, res) => {
  res.status(404).json("This page does not exist");
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`server running ${PORT}`));
