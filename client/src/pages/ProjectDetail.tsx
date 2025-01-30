import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjects } from "../api";
import FavoriteButton from "../components/FavouriteButton";
import { Typography } from "@mui/material";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState<{ id: number; name: string } | null>(null);

  useEffect(() => {
    getProjects().then((res: { data: { id: number; name: string }[] }) => {
      const foundProject = res.data.find((p: { id: number; name: string }) => p.id === parseInt(id as string));
      if (foundProject) setProject(foundProject);
    });
  }, [id]);

  return (
    <div>
      {project ? (
        <>
          <Typography variant="h4">{project.name}</Typography>
          <FavoriteButton projectId={project.id} />
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default ProjectDetail;
