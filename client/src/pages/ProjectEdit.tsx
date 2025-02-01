import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjects, updateProject } from "../api";
import FavoriteProjects from "../components/FavouriteProjects";
import { Typography, TextField, Button, Paper } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

const ProjectEdit = () => {
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

  // Fetch the project details and prefill fields
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

  // Handle text input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle date changes
  const handleDateChange = (name: string, value: Dayjs | null) => {
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission and send data to the server
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProject(formData.id, {
      ...formData,
      startDate: formData.startDate ? formData.startDate.format("YYYY-MM-DD") : null,
      endDate: formData.endDate ? formData.endDate.format("YYYY-MM-DD") : null,
    }).then(() => navigate("/project-manager/")); // Redirect to project list after update
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* Favorite Projects Sidebar */}
      <FavoriteProjects projects={[]} favoriteProjects={[]} />

      {/* Main Content */}
      <div style={{ flex: 1 }}>
        <Typography variant="h4">Project Edit Page</Typography>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <Paper style={{ padding: "20px", maxWidth: "500px" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <TextField label="Project ID" value={formData.id} fullWidth disabled />
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

                {/* Update Button */}
                <Button type="submit" variant="contained" color="primary">
                  Update
                </Button>

                {/* Back Button */}
                <Button variant="text" color="secondary" onClick={() => navigate("/project-manager/")}>
                  Go Back to Project List
                </Button>
              </form>
            </LocalizationProvider>
          </Paper>
        )}
      </div>
    </div>
  );
};

export default ProjectEdit;
