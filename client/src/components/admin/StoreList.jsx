import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import adminService from "../../services/admin";

const StoreListAdmin = () => {
  const [stores, setStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await adminService.getStores(searchTerm);
        setStores(data.data);
      } catch (err) {
        setError("Failed to fetch stores");
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, [searchTerm]);

  if (loading) return <div>Loading stores...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Stores Management</h1>
      <div>
        <input
          type="text"
          placeholder="Search stores..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => navigate("/admin/create-store")}>
          Create New Store
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Owner</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => (
            <tr key={store.id}>
              <td>{store.name}</td>
              <td>{store.email}</td>
              <td>{store.address}</td>
              <td>{store.owner?.name || "Unknown"}</td>
              <td>{store.averageRating || "No ratings"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoreListAdmin;
