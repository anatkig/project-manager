import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProjectList from "./pages/ProjectList";
import ProjectCreate from "./pages/ProjectCreate";
import ProjectEdit from "./pages/ProjectEdit";
import ProjectDetail from "./pages/ProjectDetail";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProjectList />} />
        <Route path="/create" element={<ProjectCreate />} />
        <Route path="/edit/:id" element={<ProjectEdit />} />
        <Route path="/detail/:id" element={<ProjectDetail />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
