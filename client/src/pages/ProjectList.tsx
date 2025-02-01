import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ProjectTable from "../components/project-list-components/ProjectTable";
import { getProjects } from "../api";
import Loader from "../components/Loader";
import  { Project, ProjectListProps } from "../types";

const ProjectList = ({favoriteProjects, setFavoriteProjects}:ProjectListProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
// Load projects from API
useEffect(() => {
  getProjects().then((res) => setProjects(res.data));
}, []);

  // Toggle favorite project
  const toggleFavorite = (project) => {
    const presentProject = favoriteProjects.find((proj) => proj.id === project.id);
    if (presentProject) {
      setFavoriteProjects(favoriteProjects.filter((proj) => proj.id !== project.id));
    } else {
      setFavoriteProjects([...favoriteProjects, project]);
    }
   
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
