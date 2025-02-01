import { useState, useEffect } from "react";
import "./App.css";
import FavoriteProjects from "./components/FavouriteProjects";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import ProjectList from "./pages/ProjectList";
import ProjectCreate from "./pages/ProjectCreate";
import ProjectEdit from "./pages/ProjectEdit";
import ProjectDetail from "./pages/ProjectDetail";
import { createProject } from "./api";
import { Box } from "@mui/material";
import { updateFavoriteProjects, getFavoriteProjects } from "./api";

const App = () => {
  const [favoriteProjects, setFavoriteProjects] = useState<{id:string, name:string}[]>([]);

  useEffect(() => {
    if(favoriteProjects.length === 0) {
    getFavoriteProjects().then((res) => setFavoriteProjects(res.data));
    }
    return () =>{
      updateFavoriteProjects(favoriteProjects);
    }
  }, [favoriteProjects]);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Box display="flex">
          <FavoriteProjects  favoriteProjects={favoriteProjects}/>
          <Box flex={1} p={2}>
            <Routes>
              <Route
                path="project-manager/"
                element={<ProjectList favoriteProjects={favoriteProjects} setFavoriteProjects={setFavoriteProjects}/>}
              />
              <Route
                path="project-manager/create"
                element={
                  <ProjectCreate initialData={{}} onSubmit={createProject} />
                }
              />
              <Route
                path="project-manager/edit/:id"
                element={<ProjectEdit />}
              />
              <Route
                path="project-manager/detail/:id"
                element={<ProjectDetail />}
              />
            </Routes>
          </Box>
        </Box>
      </Router>
    </div>
  );
};

export default App;
