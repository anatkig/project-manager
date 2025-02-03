import { useNavigate } from "react-router";
import { TextField, Button, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import styled from "styled-components";

const StyledComponentContainer = styled.div`
  display: flex;
  gap: 20px;`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;`;

interface ProjectCreateProps {
  initialData: {
    id?: string;
    name?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    manager?: string;
  };
  onSubmit: (data: any) => void;
}

const ProjectCreate = ({ initialData, onSubmit }: ProjectCreateProps) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: initialData.id || "",
    name: initialData.name || "",
    description: initialData.description || "",
    startDate: initialData.startDate ? dayjs(initialData.startDate) : null,
    endDate: initialData.endDate ? dayjs(initialData.endDate) : null,
    manager: initialData.manager || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (name: string, value: Dayjs | null) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      startDate: formData.startDate ? formData.startDate.format("YYYY-MM-DD") : null,
      endDate: formData.endDate ? formData.endDate.format("YYYY-MM-DD") : null,
    });
    navigate("/project-manager/");
  };

  return (
    <StyledComponentContainer>
      <div style={{ flex: 1 }}>
        <Typography variant="h4">Project Create Page</Typography>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StyledForm onSubmit={handleSubmit}>
            <Typography variant="h5">Create New Project</Typography>

            <TextField label="Project Name" name="name" value={formData.name} onChange={handleChange} fullWidth required />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
            />

            <DatePicker
              label="Start Date"
              value={formData.startDate}
              onChange={(date) => handleDateChange("startDate", date)}
            />
            <DatePicker
              label="End Date"
              value={formData.endDate}
              onChange={(date) => handleDateChange("endDate", date)}
            />

            <TextField label="Project Manager" name="manager" value={formData.manager} onChange={handleChange} fullWidth required />

            <Button type="submit" variant="contained" color="primary">
              Create
            </Button>
          </StyledForm>
        </LocalizationProvider>
      </div>
    </StyledComponentContainer>
  );
};

export default ProjectCreate;


