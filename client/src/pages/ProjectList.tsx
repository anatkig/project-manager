import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ProjectTable from "../components/ProjectTable";
import { getProjects } from "../api";
import Loader from "../components/layout/Loader";
import  { Project, ProjectListProps } from "../types";

const ProjectList = ({favoriteProjects, setFavoriteProjects, newProjectCreated}:ProjectListProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);

useEffect(() => {
  getProjects().then((res) => {
    setProjects(res.data)
    setIsLoadingProjects(false);
  });
},[newProjectCreated]);

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
      <Box flex={1} p={2}>
        {!isLoadingProjects ? (
          <ProjectTable
            projects={projects}
            favoriteProjects={favoriteProjects}
            toggleFavorite={toggleFavorite}
          />
        ) : (
          <Loader />
        )}
      </Box>
    </Box>
  );
};

export default ProjectList;
