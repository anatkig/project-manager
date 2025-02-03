const express = require("express");
const router = express.Router();
const projectController = require("../controllers/favoriteProjectsController");

router.get("/", projectController.getFavoriteProjects);
router.post("/", projectController.updateFavoriteProjects);

module.exports = router;
