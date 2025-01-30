import { List, ListItem, Typography } from "@mui/material";

interface FavoriteProjectsProps {
  projects: { id: string; name: string }[];
  favoriteProjects: string[];
}

const FavoriteProjects = ({ projects, favoriteProjects }: FavoriteProjectsProps) => {
  return (
    <div style={{ width: "250px", borderRight: "1px solid #ccc", padding: "10px" }}>
      <Typography variant="h6">Favorite Projects</Typography>
      <List>
        {projects
          .filter((project) => favoriteProjects.includes(project.id))
          .map((project) => (
            <ListItem key={project.id}>{project.name}</ListItem>
          ))}
      </List>
    </div>
  );
};

export default FavoriteProjects;
