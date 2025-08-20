import axios from "axios";

const API_URL = "http://localhost:5000/api";

const submitRating = async (storeId, rating) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${API_URL}/user/ratings`,
    { storeId, rating },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const updateRating = async (storeId, rating) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(
    `${API_URL}/user/ratings/${storeId}`,
    { rating },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export default {
  submitRating,
  updateRating,
};
