import axios from "axios";

const API_URL = "https://project-manager-0tsg.onrender.com/api";

export const getProjects = () => axios.get(`${API_URL}/projects`);
export const createProject = (data) => axios.post(`${API_URL}/projects`, data);
export const updateProject = (id, data) => axios.put(`${API_URL}/projects/${id}`, data);
export const deleteProject = (id) => axios.delete(`${API_URL}/projects/${id}`);
export const getFavoriteProjects = () => axios.get(`${API_URL}/favorite_projects`);
export const updateFavoriteProjects = (data) => axios.post(`${API_URL}/favorite_projects`, data);

