import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link } from "@mui/material";
import { useNavigate } from "react-router";
import EditButton from "./buttons/EditButton";
import { ProjectTableProps } from "../types";
import FavoriteButton from "./buttons/FavouriteButton";

const ProjectTable = ({ projects, favoriteProjects, toggleFavorite }: ProjectTableProps) => {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Project ID</TableCell>
            <TableCell>Project Name</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Project Manager</TableCell>
            <TableCell>Favorite</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.id}</TableCell>

              <TableCell>
                <Link
                  component="button"
                  onClick={() => navigate(`/project-manager/detail/${project.id}`)}
                  underline="hover"
                  color="primary"
                  style={{ cursor: "pointer" }}
                >
                  {project.name}
                </Link>
              </TableCell>

              <TableCell>{project.startDate}</TableCell>
              <TableCell>{project.endDate}</TableCell>
              <TableCell>{project.manager}</TableCell>

              <TableCell>
                <FavoriteButton
                  isFavorite={favoriteProjects.some((proj) => parseInt(proj.id) === parseInt(project.id)) ? true : false}
                  toggleFavorite={() => toggleFavorite(project)}
                />
              </TableCell>

              <TableCell>
                <EditButton projectId={project.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectTable;