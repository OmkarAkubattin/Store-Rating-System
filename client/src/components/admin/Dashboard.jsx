import { useState, useEffect } from "react";
import adminService from "../../services/admin";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminService.getDashboardStats();
        setStats(data.data);
      } catch (err) {
        setError("Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-600">
        Loading dashboard...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        {error}
      </div>
    );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-600">Total Users</h2>
          <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-600">Total Stores</h2>
          <p className="text-3xl font-bold text-green-600">
            {stats.totalStores}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-600">Total Ratings</h2>
          <p className="text-3xl font-bold text-yellow-600">
            {stats.totalRatings}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
