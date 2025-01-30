import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../api";
import { Button, List, ListItem, Typography } from "@mui/material";

const ProjectList = () => {
  const [projects, setProjects] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    getProjects().then((res) => setProjects(res.data));
  }, []);

  return (
    <div>
      <Typography variant="h4">Project List</Typography>
      <Button component={Link} to="/create" variant="contained">
        Create Project
      </Button>
      <List>
        {projects.map((project) => (
          <ListItem key={project.id}>
            <Link to={`/detail/${project.id}`}>{project.name}</Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ProjectList;
