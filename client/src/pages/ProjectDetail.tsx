import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getProjects } from "../api";
import FavoriteButton from "../components/buttons/FavouriteButton";
import { Typography, Button, Paper } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { ProjectDetailProps } from "../types";
import Loader from "../components/layout/Loader";
import EditButton from "../components/buttons/EditButton";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  position: relative;
`;

const FavoriteButtonContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const ProjectDetail = ({favoriteProjects}:ProjectDetailProps) => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [project, setProject] = useState<{
    id: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    manager: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <PageContainer>
      <div style={{ flex: 1 }}>
        <Typography variant="h4">Project Detail Page</Typography>

        {loading ? (
          <Loader />
        ) : project ? (
          <StyledPaper>
            <FavoriteButtonContainer>
              <FavoriteButton
                isFavorite={favoriteProjects.some((proj) => parseInt(proj.id) === parseInt(project.id)) ? true : false}
              />
            </FavoriteButtonContainer>

            <Typography variant="h6"><strong>Project ID:</strong> {project.id}</Typography>
            <Typography variant="h6"><strong>Project Name:</strong> {project.name}</Typography>
            <Typography variant="h6"><strong>Description:</strong></Typography>
            <Typography style={{ marginBottom: "10px" }}>{project.description}</Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Typography variant="h6"><strong>Start Date:</strong> {dayjs(project.startDate).format("YYYY-MM-DD")}</Typography>
              <Typography variant="h6"><strong>End Date:</strong> {dayjs(project.endDate).format("YYYY-MM-DD")}</Typography>
            </LocalizationProvider>

            <Typography variant="h6"><strong>Project Manager:</strong> {project.manager}</Typography>

            <ButtonContainer >
              <Button variant="contained" color="primary" onClick={() => navigate("/project-manager/")}>
                Back
              </Button>
              <EditButton projectId={project.id} />
            </ButtonContainer>
          </StyledPaper>
        ) : (
          <Typography>Project not found.</Typography>
        )}
      </div>
    </PageContainer>
  );
};

export default ProjectDetail;

