import { List, ListItemButton, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { FavoriteProjectsProps } from "../types";
import Loader from "./layout/Loader";
import styled from "styled-components";

const FavoriteProjectsContainer = styled.div`
  width: 250px;
  border-right: 1px solid #ccc;
  padding: 10px;
`;

const FavoriteProjects = ({ favoriteProjects, isLoadingFavoriteProjects}: FavoriteProjectsProps) => {
  const navigate = useNavigate();

  return (
    <FavoriteProjectsContainer>
      <Typography variant="h6">Favorite Projects</Typography>
      {isLoadingFavoriteProjects? (
        <Loader />
      ) : (
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
      )}
    </FavoriteProjectsContainer>
  );
};

export default FavoriteProjects;
