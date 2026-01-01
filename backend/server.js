const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "mysecretkey";

const app = express();

app.use(cors());
app.use(express.json());

// TEMP user storage
const users = [];

// REGISTER API
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({
    id: users.length + 1,
    name,
    email,
    password: hashedPassword,
  });

  res.json({ message: "User registered successfully" });
});

app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

// 🔐 JWT VERIFY MIDDLEWARE
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
}


// 🔹 LOGIN API
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  // user find karo
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // password compare
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // JWT token generate
  const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    message: "Login successful",
    token,
  });
});

// 🔒 PROTECTED DASHBOARD API
app.get("/api/dashboard", authenticateToken, (req, res) => {
  res.json({
    message: "Welcome to dashboard",
    user: req.user,
    tasks: [
      "Learn React",
      "Build Auth App",
      "Submit Assignment"
    ],
  });
});

