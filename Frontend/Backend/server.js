// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

MONGO_URI = "YOUR_MONGO_URI";

// Connect to MongoDB
mongoose.connect(MONGO_URI).then(() => {
    console.log("Connected to MongoDB!");
});

// Routes
app.use("/api/patient", patientRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/appointment", appointmentRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
