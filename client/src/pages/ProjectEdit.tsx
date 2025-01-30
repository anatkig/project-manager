import  { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjects, updateProject } from "../api";
import ProjectForm from "../components/ProjectForm";
import { Typography } from "@mui/material";

const ProjectEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    getProjects().then((res) => {
      const foundProject = res.data.find((p: { id: number }) => p.id === parseInt(id as string));
      if (foundProject) setProject(foundProject);
    });
  }, [id]);

  const handleUpdate = (data) => {
    updateProject(id, data).then(() => navigate("/"));
  };

  return (
    <div>
      <Typography variant="h4">Edit Project</Typography>
      {project ? <ProjectForm initialData={project} onSubmit={handleUpdate} /> : "Loading..."}
    </div>
  );
};

export default ProjectEdit;
