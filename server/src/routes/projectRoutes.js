const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

router.get("/", projectController.getAllProjects);
router.get("/:id", projectController.getProjectById);
router.post("/", projectController.createProject);
router.put("/:id", projectController.updateProject);
router.delete("/:id", projectController.deleteProject);
router.get("/favorite_projects", projectController.getFavouriteProjects);
router.post("/favorite_projects/:id", projectController.updateFavoriteProjects);

module.exports = router;
