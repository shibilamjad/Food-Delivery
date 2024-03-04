const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const app = express();
const userRoute = require("./routes/user");
const menuRoute = require("./routes/menu");
const orderRoute = require("./routes/order");
const restaurantRoute = require("./routes/restaurant");
const dashBoardRoute = require("./routes/dashboard");
const deliveryBoyRoute = require("./routes/deliveyBoy");

const cookieParser = require("cookie-parser");
const http = require("http");
const socketIo = require("socket.io");
const {
  fetchAndEmitAvailableOrders,
  updateDeliveryBoyLocation,
} = require("./controller/deliveryBoysController");

require("dotenv").config();

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    methods: ["GET", "POST"],
  },
});

// Initialize express app
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    credentials: true,
    cookie: {
      sameSite: "none",
      secure: true,
    },
  })
);
app.use(cookieParser());
app.use(express.json());

// Connect to the database
connectDb();

// Routes
app.use("/api/dashboard", dashBoardRoute);
app.use("/api/users", userRoute);
app.use("/api/menu", menuRoute);
app.use("/api/order", orderRoute);
app.use("/api/restaurants", restaurantRoute);
app.use("/api/delivery", deliveryBoyRoute);

// Handle all other routes
app.all("*", (req, res) => {
  res.status(404).json("This page does not exist");
});

// Create HTTP server
io.on("connection", async (socket) => {
  try {
    console.log("A user connected");
    // fetch available order and emit to the client
    // await fetchAndEmitAvailableOrders(socket);

    socket.on("deliveryBoyLocationUpdate", async (location) => {
      try {
        // Update delivery boy's location in the database
        await updateDeliveryBoyLocation(location);
        io.emit("deliveryBoyLocationUpdate", location);
      } catch (error) {
        console.error("Error updating delivery boy location:", error);
      }
    });
    // discounect
    socket.on("disconnect", () => {
      console.log("A user disconnect");
    });
  } catch (error) {
    console.error("Error handling connection:", error);
    socket.emit("error", "An error occurred while handling the connection");
  }
});

// Start the server
const PORT = process.env.PORT || 3005;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
