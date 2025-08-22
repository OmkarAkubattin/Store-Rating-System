import { useState, useEffect } from "react";
import storeOwnerService from "../../services/storeOwner";
import { Loader2, Store, MapPin, Star, Users } from "lucide-react";

const OwnerDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await storeOwnerService.getStoreStats();
        setStats(response.data);
      } catch (err) {
        setError("⚠️ Failed to load store stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
        <span className="ml-2 text-gray-600">Loading dashboard...</span>
      </div>
    );

  if (error)
    return (
      <div className="max-w-lg mx-auto bg-red-50 border border-red-200 text-red-600 font-medium p-4 rounded-lg flex items-center gap-2">
        {error}
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        🏬 Store Owner Dashboard
      </h1>

      {/* Store Info Card */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
          <Store className="text-blue-600" />{" "}
          {stats?.store?.name || "No store found"}
        </h2>
        <p className="flex items-center text-gray-600 gap-2">
          <MapPin className="w-4 h-4 text-gray-500" />{" "}
          {stats?.store?.address || "No address"}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 flex flex-col items-center">
          <Star className="text-yellow-500 w-8 h-8 mb-2" />
          <h3 className="text-lg font-semibold text-gray-800">
            {stats?.averageRating || "No ratings yet"}
          </h3>
          <p className="text-gray-500 text-sm">Average Rating</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 flex flex-col items-center">
          <Users className="text-blue-500 w-8 h-8 mb-2" />
          <h3 className="text-lg font-semibold text-gray-800">
            {stats?.totalRatings ?? 0}
          </h3>
          <p className="text-gray-500 text-sm">Total Ratings</p>
        </div>

        {/* You can add more stats here (e.g. total sales, visitors, etc.) */}
      </div>
    </div>
  );
};

export default OwnerDashboard;
