const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

router.get("/", projectController.getFavoriteProjects);
router.post("/:id", projectController.updateFavoriteProjects);

module.exports = router;
