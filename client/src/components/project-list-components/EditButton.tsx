import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface EditButtonProps {
  projectId: string;
}

const EditButton = ({ projectId }: EditButtonProps) => {
  return (
    <IconButton component={Link} to={`/project-manager/edit/${projectId}`} color="primary">
      <EditIcon />
    </IconButton>
  );
};

export default EditButton;