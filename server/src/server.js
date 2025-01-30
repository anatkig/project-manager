const express = require("express");
const cors = require("cors");
const projectRoutes = require("./routes/projectRoutes");
const config = require("./config");

const app = express();
const PORT = config.PORT;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/projects", projectRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
