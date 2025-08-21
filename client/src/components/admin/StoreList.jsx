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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Stores Management
        </h1>
        <button
          onClick={() => navigate("/admin/create-store")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          + Create New Store
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search stores..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {loading && <div className="text-gray-600">Loading stores...</div>}
      {error && <div className="text-red-600">{error}</div>}

      {!loading && !error && (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Address
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Owner
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody>
              {stores.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No stores found
                  </td>
                </tr>
              ) : (
                stores.map((store) => (
                  <tr
                    key={store.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {store.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {store.email}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {store.address}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {store.owner?.name || "Unknown"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {store.averageRating || "No ratings"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StoreListAdmin;
