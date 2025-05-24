


const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require("bcryptjs"); // Import bcrypt for password hashing
const jwt = require("jsonwebtoken"); // JWT for token-based authentication
const User = require("./models/User"); // Import the User model
const dotenv = require("dotenv");
const socketio = require("socket.io");
const cors = require("cors");

// Load environment variables from .env file
dotenv.config();

// Set port and Mongo URI
const port = process.env.PORT || 5005;
const mongoURI = process.env.MONGO_DB_URI; // Make sure this is in your .env file

// MongoDB connection
mongoose.connect(mongoURI, {
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Initialize Express
const app = express();
app.use(express.json()); // Middleware to parse JSON payloads
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data

app.get("/api/user", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Use process.env.JWT_SECRET without quotes to reference the actual environment variable
    const user = jwt.verify(token, process.env.JWT_SECRET);

    // Return user details with some mock stats and shipments
    res.status(200).json({ 
      username: user.username, 
      stats: { total: 5, delivered: 3, inTransit: 1, delayed: 1 }, 
      shipments: [
        { id: 1, name: "Package A", status: "Delivered" },
        { id: 2, name: "Package B", status: "In Transit" },
        { id: 3, name: "Package C", status: "Delayed" }
      ] 
    });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});

// Allow CORS for frontend (React) on port 5173
app.use(
  cors({
    origin: "http://localhost:5173", // Update with your frontend URL
  })
);

// Set up Socket.io
const server = http.createServer(app);
const io = socketio(server);

// Socket.io handling
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("send-location", (data) => {
    io.emit("receive-location", { id: socket.id, ...data });
  });

  socket.on("disconnect", () => {
    io.emit("user-disconnected", socket.id);
  });
});

// Serve static files (if needed)
app.use(express.static(path.join(__dirname, "public")));
app.use("/Css", express.static("Css"));
app.use("/js", express.static("js"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Example route
app.get("/", (req, res) => {
  res.render("index"); // Renders 'views/index.ejs'
});

// Signup API endpoint
app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;

  // Validate that all fields are provided
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Username, email, and password are required" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Generate JWT Token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: "User created successfully", token });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login API endpoint
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
server.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});


















