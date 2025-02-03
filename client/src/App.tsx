import { useState, useEffect } from "react";
import "./App.css";
import FavoriteProjects from "./components/FavouriteProjects";
import { BrowserRouter as Router } from "react-router";
import Navbar from "./components/layout/Navbar";
import { Routes, Route } from "react-router";
import ProjectList from "./pages/ProjectList";
import ProjectCreate from "./pages/ProjectCreate";
import ProjectEdit from "./pages/ProjectEdit";
import ProjectDetail from "./pages/ProjectDetail";
import { createProject, updateProject } from "./api";
import { Box } from "@mui/material";
import { updateFavoriteProjects, getFavoriteProjects } from "./api";
import { Project } from "./types";

const App = () => {
  const [favoriteProjects, setFavoriteProjects] = useState<Project[]>([]);
  const [isLoadingFavoriteProjects, setIsLoadingFavoriteProjects] = useState(true);
  const [newProjectCreated, setNewProjectCreated] = useState(false);

  useEffect(() => {
    if (favoriteProjects.length === 0) {
      getFavoriteProjects().then((res) => {
        if(res.data) {
        setFavoriteProjects(res.data)
        }
        setIsLoadingFavoriteProjects(false);
      });
    }
  }, []);

  useEffect(() => {
    if(!isLoadingFavoriteProjects) {
    updateFavoriteProjects(favoriteProjects);
    }
  }, [favoriteProjects, isLoadingFavoriteProjects]);

  const createNewProject = (project:Project) => {
    createProject(project).then(() => {
      setNewProjectCreated(true);
    }
  )
  };
  const editProject = (project:Project) => {
    const correspondingFavoriteProject = favoriteProjects.find((p) => p.id === project.id);
    if (correspondingFavoriteProject) {
      const updatedFavoriteProjects = favoriteProjects.map((p) =>
        p.id === project.id ? project : p
      );
      setFavoriteProjects(updatedFavoriteProjects);
    }
   return updateProject(project.id,project);
  };

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Box display="flex">
          <FavoriteProjects
            favoriteProjects={favoriteProjects}
            isLoadingFavoriteProjects={isLoadingFavoriteProjects}
          />
          <Box flex={1} p={2}>
            <Routes>
              <Route
                path="project-manager/"
                element={
                  <ProjectList
                    favoriteProjects={favoriteProjects}
                    setFavoriteProjects={setFavoriteProjects}
                    newProjectCreated={newProjectCreated}
                  />
                }
              />
              <Route
                path="project-manager/create"
                element={
                  <ProjectCreate initialData={{}} onSubmit={createNewProject} />
                }
              />
              <Route
                path="project-manager/edit/:id"
                element={<ProjectEdit editProject={editProject}/>}
              />
              <Route
                path="project-manager/detail/:id"
                element={
                  <ProjectDetail
                    favoriteProjects={favoriteProjects}
                  />
                }
              />
            </Routes>
          </Box>
        </Box>
      </Router>
    </div>
  );
};

export default App;
