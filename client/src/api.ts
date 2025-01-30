import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getProjects = () => axios.get(`${API_URL}/projects`);
export const createProject = (data) => axios.post(`${API_URL}/projects`, data);
export const updateProject = (id, data) => axios.put(`${API_URL}/projects/${id}`, data);
export const deleteProject = (id) => axios.delete(`${API_URL}/projects/${id}`);
