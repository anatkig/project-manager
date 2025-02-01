import { List, ListItemButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface FavoriteProjectsProps {
  favoriteProjects: { id: string; name: string }[];
}

const FavoriteProjects = ({favoriteProjects }: FavoriteProjectsProps) => {
const navigate = useNavigate();
  return (
    <div style={{ width: "250px", borderRight: "1px solid #ccc", padding: "10px" }}>
      <Typography variant="h6">Favorite Projects</Typography>
      <List>
        {favoriteProjects.map((project) => (
                  <ListItemButton
                  key={project.id}
                  onClick={() => navigate(`/project-manager/detail/${project.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  {project.name}
                </ListItemButton>
          ))}
      </List>
    </div>
  );
};

export default FavoriteProjects;
