import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import EditButton from "./EditButton";
import { ProjectTableProps } from "../../types";

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

              {/* Clickable Project Name */}
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

              {/* Favorite Icon */}
              <TableCell>
                <IconButton onClick={() => toggleFavorite(project)} color="primary">
                  {favoriteProjects.find(proj=>proj.id===project.id)? <Favorite color="error" /> : <FavoriteBorder />}
                </IconButton>
              </TableCell>

              {/* Edit Button */}
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