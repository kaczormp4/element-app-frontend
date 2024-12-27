import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL; // Set the API base URL
axios.defaults.withCredentials = true; // Include HTTP-Only cookies in requests

const API_URL = process.env.REACT_APP_API_URL;

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/users/login`, {
    username,
    password,
  });

  sessionStorage.setItem("jwt_token", response.data.token);

  return response.data;
};

export const register = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/users/register`, {
    username,
    password,
  });
  return response.data;
};

export const getSession = async () => {
  // Get the token from session storage
  const token = sessionStorage.getItem("jwt_token");

  if (!token) {
    throw new Error("No token found");
  }

  const response = await axios.get(`${API_URL}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAllUsers = async () => {
  const token = sessionStorage.getItem("jwt_token");

  if (!token) {
    throw new Error("No token found");
  }

  const response = await axios.get(`${API_URL}/users/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
