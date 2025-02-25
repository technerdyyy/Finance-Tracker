const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDb = require("./config/connectDb");
const path = require("path");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDb();

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Import and use routes
const userRoutes = require("./routes/userRoute");
app.use("/api/v1/users", userRoutes);

app.get("*", (req, res) => {
    res.send("this is leftovers");
})


// Serve React frontend for any unknown routes
app.use(express.static(path.join(__dirname, "frontend", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Debug: Print registered routes
console.log("Registered Routes:");
app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log(r.route.path);
  }
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`.bgBlue.black);
});
