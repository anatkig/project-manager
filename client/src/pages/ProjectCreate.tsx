import { useNavigate } from "react-router-dom";
import { createProject } from "../api";
import ProjectForm from "../components/ProjectForm";

const ProjectCreate = () => {
  const navigate = useNavigate();
  const handleCreate = (data: any) => {
    createProject(data).then(() => navigate("/"));
  };

  return (
    <div>
      <ProjectForm initialData={{}} onSubmit={handleCreate} />
      <ProjectForm initialData={{}} onSubmit={handleCreate} />
    </div>
  );
};

export default ProjectCreate;
