import  { useState } from "react";
import { TextField, Button } from "@mui/material";

const ProjectForm = ({ initialData, onSubmit }) => {
  const [name, setName] = useState(initialData?.name || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <Button type="submit" variant="contained">
        Save Project
      </Button>
    </form>
  );
};

export default ProjectForm;
