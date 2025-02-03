const favoriteProjectsModel = require("../models/favoriteProjectsModel");

exports.getFavoriteProjects = (req, res) => {
  res.json(favoriteProjectsModel.getFavoriteProjects());
}

exports.updateFavoriteProjects = (req, res) => {
  res.json(favoriteProjectsModel.updateFavoriteProjects(req.body));
}