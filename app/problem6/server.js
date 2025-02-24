const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const resourceRoutes = require("./resource.routes.ts");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/resources", resourceRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
