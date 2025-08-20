import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import adminService from "../../services/admin";
import userService from "../../services/users";

const CreateStore = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [storeOwners, setStoreOwners] = useState([]);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStoreOwners = async () => {
      try {
        const owners = await userService.getStoreOwners();
        setStoreOwners(owners);
        if (owners.length > 0) setOwnerId(owners[0].id);
      } catch (error) {
        setErrors({ form: "Failed to load store owners" });
      }
    };

    fetchStoreOwners();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !address || !ownerId) {
      setErrors({ form: "All fields are required" });
      return;
    }

    setLoading(true);
    try {
      await adminService.createStore({ name, email, address, ownerId });
      setSuccess(true);
      setTimeout(() => navigate("/admin/stores"), 2000);
    } catch (error) {
      setErrors({ form: error.message || "Store creation failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create New Store</h1>
      {errors.form && <div>{errors.form}</div>}
      {success && <div>Store created successfully!</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Store Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Store Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Store Address:</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Store Owner:</label>
          <select
            value={ownerId}
            onChange={(e) => setOwnerId(e.target.value)}
            disabled={storeOwners.length === 0}
          >
            {storeOwners.map((owner) => (
              <option key={owner.id} value={owner.id}>
                {owner.name} ({owner.email})
              </option>
            ))}
          </select>
          {storeOwners.length === 0 && <div>No store owners available</div>}
        </div>
        <button type="submit" disabled={loading || storeOwners.length === 0}>
          {loading ? "Creating..." : "Create Store"}
        </button>
      </form>
    </div>
  );
};

export default CreateStore;
