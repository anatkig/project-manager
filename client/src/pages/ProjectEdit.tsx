import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getProjects } from "../api";
import { Typography, TextField, Button, Paper } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import Loader from "../components/layout/Loader";
import { ProjectEditProps } from "../types";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  gap: 20px;
`;


const StyledPaper = styled(Paper)`
  padding: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
`;

const StyledButton = styled(Button)`
  margin-top: 10px;
`;

const ProjectEdit = ({ editProject }: ProjectEditProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    startDate: null as Dayjs | null,
    endDate: null as Dayjs | null,
    manager: "",
  });

  useEffect(() => {
    setLoading(true);
    getProjects().then((res: { data: any[] }) => {
      const foundProject = res.data.find((p) => p.id === Number(id));
      if (foundProject) {
        setFormData({
          id: foundProject.id,
          name: foundProject.name || "",
          description: foundProject.description || "",
          startDate: foundProject.startDate ? dayjs(foundProject.startDate) : null,
          endDate: foundProject.endDate ? dayjs(foundProject.endDate) : null,
          manager: foundProject.manager || "",
        });
      }
      setLoading(false);
    });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (name: string, value: Dayjs | null) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProject = {
      ...formData,
      startDate: formData.startDate ? formData.startDate.format("YYYY-MM-DD") : null,
      endDate: formData.endDate ? formData.endDate.format("YYYY-MM-DD") : null,
    };
    editProject(updatedProject).then(() => navigate("/project-manager/"));
  };

  return (
    <StyledContainer>
      <div style={{ flex: 1 }}>
        <Typography variant="h4">Project Edit Page</Typography>

        {loading ? (
          <Loader />
        ) : (
          <StyledPaper>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StyledForm onSubmit={handleSubmit}>
                <StyledTextField label="Project ID" value={formData.id} fullWidth disabled />
                <StyledTextField label="Project Name" name="name" value={formData.name} onChange={handleChange} fullWidth required />
                <StyledTextField
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

                <StyledTextField label="Project Manager" name="manager" value={formData.manager} onChange={handleChange} fullWidth required />

                <StyledButton type="submit" variant="contained" color="primary">
                  Update
                </StyledButton>

                <StyledButton variant="text" color="secondary" onClick={() => navigate("/project-manager/")}>
                  Go Back to Project List
                </StyledButton>
              </StyledForm>
            </LocalizationProvider>
          </StyledPaper>
        )}
      </div>
    </StyledContainer>
  );
};

export default ProjectEdit;
