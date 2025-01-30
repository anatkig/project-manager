import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../api";
import { Button, Typography } from "@mui/material";
import FavoriteProjects from "../components/FavouriteProjects";
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
    <div style={{ display: "flex", gap: "20px" }}>
      {/* Favorite Projects Sidebar */}
      <FavoriteProjects projects={projects} favoriteProjects={favoriteProjects} />

      {/* Main Project List */}
      <div style={{ flex: 1 }}>
        <Typography variant="h4">Project List Page</Typography>
        <Button component={Link} to="/create" variant="contained" style={{ marginBottom: "10px" }}>
          Create Project
        </Button>

        {/* Project Table */}
        <ProjectTable projects={projects} favoriteProjects={favoriteProjects} toggleFavorite={toggleFavorite} />
      </div>
    </div>
  );
};

export default ProjectList;

