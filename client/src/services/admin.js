const getUserDetails = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
import axios from "axios";

const API_URL = "http://localhost:5000/api/admin";

const getDashboardStats = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const createUser = async (userData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${API_URL}/users`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getStores = async (search = "ganesh") => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/stores`, {
    params: { search },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const createStore = async (storeData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${API_URL}/stores`, storeData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default {
  getDashboardStats,
  createUser,
  getStores,
  createStore,
  getUserDetails,
};
