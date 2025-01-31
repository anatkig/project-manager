import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../api";
import { Button, Typography, Box, List, ListItem } from "@mui/material";
import ProjectTable from "../components/project-list-components/ProjectTable";

const ProjectList = () => {
  const [projects, setProjects] = useState<
    { id: string; name: string; startDate: string; endDate: string; manager: string }[]
  >([]);
  const [favoriteProjects, setFavoriteProjects] = useState<string[]>([]);

  // Load projects from API
  useEffect(() => {
    getProjects().then((res) => setProjects(res.data));
  }, []);

  // Load favorite projects from local storage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteProjects") || "[]");
    setFavoriteProjects(storedFavorites);
  }, []);

  // Toggle favorite project
  const toggleFavorite = (id: string) => {
    let updatedFavorites;
    if (favoriteProjects.includes(id)) {
      updatedFavorites = favoriteProjects.filter((favId) => favId !== id);
    } else {
      updatedFavorites = [...favoriteProjects, id];
    }
    setFavoriteProjects(updatedFavorites);
    localStorage.setItem("favoriteProjects", JSON.stringify(updatedFavorites));
  };

  return (
    <Box display="flex">
      {/* Left Sidebar - Favorite Projects */}
      <Box width="20%" p={2} bgcolor="#F4F4F4">
        <Typography variant="h6" gutterBottom>
          Favorite Projects
        </Typography>
        <List>
          {favoriteProjects.map((favId) => {
            const project = projects.find((p) => p.id === favId);
            return project ? <ListItem key={favId}>• {project.name}</ListItem> : null;
          })}
        </List>
      </Box>

      {/* Main Project List */}
      <Box flex={1} p={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Project List Page</Typography>
          <Button component={Link} to="/create" variant="contained" color="primary">
            Create Project
          </Button>
        </Box>

        {/* Project Table */}
        <ProjectTable projects={projects} favoriteProjects={favoriteProjects} toggleFavorite={toggleFavorite} />
      </Box>
    </Box>
  );
};

export default ProjectList;
