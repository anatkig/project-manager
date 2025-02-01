const express = require("express");
const cors = require("cors");
const projectRoutes = require("./routes/projectRoutes");
const favoriteProjectsRoutes = require("./routes/favoriteProjectsRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // This is REQUIRED to handle JSON requests

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/favorite_projects", favoriteProjectsRoutes);

// Default route
app.get("/", (req, res) => {
    res.send("Server is running...");
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error("Server error:", err);
    res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
