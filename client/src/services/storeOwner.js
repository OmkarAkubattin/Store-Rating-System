import axios from "axios";

const API_URL = "http://localhost:5000/api/store-owner";

const getStoreStats = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getStoreRatings = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/ratings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default {
  getStoreStats,
  getStoreRatings,
};
