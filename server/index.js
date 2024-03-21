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
const reviewRoute = require("./routes/review");
const otpRountes = require("./routes/otp");
const cityRountes = require("./routes/city");
const { extractDeliveryBoyId } = require("./utils/jwt");
const {
  updateDeliveryBoyLocation,
} = require("./controller/deliveryBoysController");
const { updateUserLocation } = require("./controller/userController");

const cookieParser = require("cookie-parser");
const http = require("http");

require("dotenv").config();

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: [
      "https://door-dash-dine.netlify.app",
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
      "https://door-dash-dine.netlify.app",
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
app.use("/api/review", reviewRoute);
app.use("/api/otp", otpRountes);
app.use("/api/city", cityRountes);

// Handle all other routes
app.all("*", (req, res) => {
  res.status(404).json("This page does not exist");
});

// socket io
io.on("connection", async (socket) => {
  try {
    // Socket event for updating delivery boy's location
    socket.on("deliveryBoyLocationUpdate", async (data) => {
      try {
        const { latitude, longitude, token } = data;
        const deliveryBoyId = extractDeliveryBoyId(token);
        // Update delivery boy's location in the database
        await updateDeliveryBoyLocation(deliveryBoyId, latitude, longitude);
        io.emit("deliveryBoyLocationUpdate", data);
      } catch (error) {
        socket.emit(
          "error",
          "An error occurred while updating the delivery boy's location"
        );
      }
    });
    try {
      socket.on("userLocationUpdate", async (data) => {
        try {
          const { latitude, longitude, token } = data;
          const userId = extractDeliveryBoyId(token);
          // Update delivery boy's location in the database
          await updateUserLocation(userId, latitude, longitude);
          io.emit("userLocationUpdate", data);
        } catch (error) {}
      });
    } catch (error) {
      socket.emit(
        "error",
        "An error occurred while updating the user location"
      );
    }
    // Socket event for disconnection
    socket.on("disconnect", () => {});
  } catch (error) {
    socket.emit("error", "An error occurred while handling the connection");
  }
});

// Start the server
const PORT = process.env.PORT || 3005;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
