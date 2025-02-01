import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ProjectTable from "../components/project-list-components/ProjectTable";
import { getProjects } from "../api";
import Loader from "../components/Loader";

const ProjectList = ({favoriteProjects, setFavoriteProjects}) => {
  const [projects, setProjects] = useState<
  {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    manager: string;
  }[]
>([]);
// Load projects from API
useEffect(() => {
  getProjects().then((res) => setProjects(res.data));
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
      {/* Main Project List */}
      <Box flex={1} p={2}>
        {/* Project Table */}
        {projects.length?<ProjectTable projects={projects} favoriteProjects={favoriteProjects} toggleFavorite={toggleFavorite} />:<Loader />}
      </Box>
    </Box>
  );
};

export default ProjectList;
