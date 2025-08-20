import axios from "axios";

const API_URL = "http://localhost:5000/api";

const getUsers = async (search = "", role = "") => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/admin/users`, {
    params: { search, role },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getStoreOwners = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/admin/users`, {
    params: { role: "store_owner" },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default {
  getUsers,
  getStoreOwners,
};
