import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const register = async (name, email, password, address) => {
  const response = await axios.post(`${API_URL}/register`, {
    name,
    email,
    password,
    address,
  });
  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data.user;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const changePassword = async (currentPassword, newPassword) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(
    `${API_URL}/change-password`,
    { currentPassword, newPassword },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const response = await axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export default {
  register,
  login,
  logout,
  changePassword,
  getCurrentUser,
};
