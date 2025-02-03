import { Link } from "react-router";
import { Button } from "@mui/material";
import { EditButtonProps } from "../../types";

const EditButton = ({ projectId }: EditButtonProps) => {
  return (
    <Button
      component={Link}
      to={`/project-manager/edit/${projectId}`}
      variant="contained"
      color="primary"
      size="small"
    >
      Edit
    </Button>
  );
};

export default EditButton;