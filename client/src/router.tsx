import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProjectList from "./pages/ProjectList";
import ProjectCreate from "./pages/ProjectCreate";
import ProjectEdit from "./pages/ProjectEdit";
import ProjectDetail from "./pages/ProjectDetail";
import { createProject } from "./api";  // Import API call

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="project-manager/" element={<ProjectList />} />
        <Route path="project-manager/create" element={<ProjectCreate initialData={{}} onSubmit={createProject} />} />
        <Route path="project-manager/edit/:id" element={<ProjectEdit />} />
        <Route path="project-manager/detail/:id" element={<ProjectDetail />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;