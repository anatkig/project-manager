import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjects } from "../api";
import FavoriteButton from "../components/project-list-components/FavouriteButton";
import FavoriteProjects from "../components/FavouriteProjects";
import { Typography, Button, Paper } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const ProjectDetail = () => {
  const { id } = useParams(); // Get project ID from URL
  const navigate = useNavigate();
  const [project, setProject] = useState<{
    id: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    manager: string;
  } | null>(null);
  const [favoriteProjects, setFavoriteProjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Load project details from API when ID changes
  useEffect(() => {
    setLoading(true);
    getProjects().then((res: { data: any[] }) => {
      const foundProject = res.data.find((p) => p.id === Number(id));
      if (foundProject) {
        setProject(foundProject);
      }
      setLoading(false);
    });
  }, [id]);

  // Load favorite projects from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteProjects") || "[]");
    setFavoriteProjects(storedFavorites);
  }, []);

  // Toggle favorite project
  const toggleFavorite = () => {
    if (!project) return;
    let updatedFavorites;
    if (favoriteProjects.includes(project.id)) {
      updatedFavorites = favoriteProjects.filter((favId) => favId !== project.id);
    } else {
      updatedFavorites = [...favoriteProjects, project.id];
    }
    setFavoriteProjects(updatedFavorites);
    localStorage.setItem("favoriteProjects", JSON.stringify(updatedFavorites));
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* Favorite Projects Sidebar */}
      <FavoriteProjects projects={[]} favoriteProjects={[]} />

      {/* Main Content */}
      <div style={{ flex: 1 }}>
        <Typography variant="h4">Project Detail Page</Typography>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : project ? (
          <Paper style={{ padding: "20px", position: "relative", maxWidth: "600px" }}>
            {/* Favorite Button - Positioned at the top-right corner */}
            <div style={{ position: "absolute", top: "10px", right: "10px" }}>
              <FavoriteButton
                isFavorite={favoriteProjects.includes(project.id)}
                toggleFavorite={toggleFavorite}
              />
            </div>

            <Typography variant="h6"><strong>Project ID:</strong> {project.id}</Typography>
            <Typography variant="h6"><strong>Project Name:</strong> {project.name}</Typography>
            <Typography variant="h6"><strong>Description:</strong></Typography>
            <Typography style={{ marginBottom: "10px" }}>{project.description}</Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Typography variant="h6"><strong>Start Date:</strong> {dayjs(project.startDate).format("YYYY-MM-DD")}</Typography>
              <Typography variant="h6"><strong>End Date:</strong> {dayjs(project.endDate).format("YYYY-MM-DD")}</Typography>
            </LocalizationProvider>

            <Typography variant="h6"><strong>Project Manager:</strong> {project.manager}</Typography>

            {/* Buttons - Positioned at the bottom */}
            <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
              <Button variant="contained" color="primary" onClick={() => navigate("/project-manager/")}>
                Back
              </Button>
              <Button variant="contained" color="secondary" onClick={() => navigate(`/project-manager/edit/${project.id}`)}>
                Edit
              </Button>
            </div>
          </Paper>
        ) : (
          <Typography>Project not found.</Typography>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;

