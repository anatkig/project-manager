const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

router.get("/favorite_projects", projectController.getFavoriteProjects);
router.post("/favorite_projects/:id", projectController.updateFavoriteProjects);

router.get("/", projectController.getAllProjects);
router.get("/:id", projectController.getProjectById);
router.post("/", projectController.createProject);
router.put("/:id", projectController.updateProject);
router.delete("/:id", projectController.deleteProject);

module.exports = router;
