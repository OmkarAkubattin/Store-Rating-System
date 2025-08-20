import axios from "axios";

const API_URL = "http://localhost:5000/api";

const getStores = async (search = "") => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/user/stores`, {
    params: { search },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const createStore = async (storeData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${API_URL}/admin/stores`, storeData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default {
  getStores,
  createStore,
};
