import { useState, useEffect } from "react";
import StoreCard from "./StoreCard";
import storeService from "../../services/stores";
import { Loader2, Search, AlertCircle } from "lucide-react";

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await storeService.getStores(searchTerm);
        setStores(data.data);
      } catch (err) {
        setError("⚠️ Failed to fetch stores");
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, [searchTerm]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">🏬 Stores</h1>

      {/* Search Bar */}
      <div className="relative w-full max-w-md mb-6">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search stores..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
          <span className="ml-2 text-gray-600">Loading stores...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex items-center gap-2 text-red-600 font-medium bg-red-50 border border-red-200 p-3 rounded-lg">
          <AlertCircle size={18} /> {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && stores.length === 0 && (
        <div className="text-gray-500 italic text-center py-10">
          No stores found.
        </div>
      )}

      {/* Stores Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </div>
  );
};

export default StoreList;
