const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const customerRoutes = require("./routes/customerRoutes");
const leadRoutes = require("./routes/leadRoutes");
const dealRoutes = require("./routes/dealRoutes");
const reportRoutes = require("./routes/reportRoutes");
const settingsRoutes = require("./routes/settingsRoutes");


const app = express();

app.use(cors());
app.use(express.json());

// Customer API
app.use("/api/customers", customerRoutes);

// Lead API
app.use("/api/leads", leadRoutes);

//Deal API
app.use("/api/deals",dealRoutes);

//Report API
app.use("/api/reports",reportRoutes);

//Setting  API
app.use("/api/settings",settingsRoutes);



// DELETE TEST
app.delete("/delete-test", (req, res) => {
  res.json({
    message: "DELETE TEST WORKING",
  });
});

// Test Lead Route
app.get("/test-leads", (req, res) => {
  res.json({
    message: "Lead test route is working",
  });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully!");
  })
  .catch((error) => {
    console.error("MongoDB Connection Error:", error);
  });

// Server
const PORT = 5000;
app.get("/test", (req, res) => {
  res.send("SERVER TEST WORKING");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});