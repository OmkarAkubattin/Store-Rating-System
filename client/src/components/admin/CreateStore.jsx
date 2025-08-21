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
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Create New Store
        </h1>

        {errors.form && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg">
            {errors.form}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
            Store created successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">
              Store Name
            </label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Store Email
            </label>
            <input
              type="email"
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Store Address
            </label>
            <textarea
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Store Owner
            </label>
            <select
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
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
            {storeOwners.length === 0 && (
              <p className="text-sm text-gray-500 mt-1">
                No store owners available
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || storeOwners.length === 0}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {loading ? "Creating..." : "Create Store"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateStore;
