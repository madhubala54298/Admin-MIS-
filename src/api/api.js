import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Backend URL

// Login API
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data; // Token or Error message
  } catch (error) {
    console.error("Login Error:", error);
    return null;
  }
};

// Fetch Civil Work Categories
export const getCivilWorkCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/civil-work`);
    return response.data;
  } catch (error) {
    console.error("Error fetching civil work categories:", error);
    return [];
  }
};

// Fetch Projects under Civil Work
export const getProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/projects`);
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

// Add New Project
export const addProject = async (project) => {
  try {
    const response = await axios.post(`${API_URL}/projects`, project);
    return response.data;
  } catch (error) {
    console.error("Error adding project:", error);
    return null;
  }
};

// Delete Project
export const deleteProject = async (projectId) => {
  try {
    await axios.delete(`${API_URL}/projects/${projectId}`);
    return true;
  } catch (error) {
    console.error("Error deleting project:", error);
    return false;
  }
};
