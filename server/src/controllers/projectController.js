const projectModel = require("../models/projectModel");

exports.getAllProjects = (req, res) => {
  res.json(projectModel.getAllProjects());
};

exports.getProjectById = (req, res) => {
  const project = projectModel.getProjectById(req.params.id);
  project ? res.json(project) : res.status(404).json({ error: "Project not found" });
};

exports.createProject = (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Project name is required" });
  res.json(projectModel.createProject({ ...req.body }));
};

exports.updateProject = (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Project name is required" });
  const updatedProject = projectModel.updateProject(req.params.id, req.body);
  updatedProject ? res.json(updatedProject) : res.status(404).json({ error: "Project not found" });
};

exports.deleteProject = (req, res) => {
  res.json(projectModel.deleteProject(req.params.id));
};