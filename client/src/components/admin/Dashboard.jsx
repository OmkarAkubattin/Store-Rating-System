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

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <h2>Statistics</h2>
        <p>Total Users: {stats.totalUsers}</p>
        <p>Total Stores: {stats.totalStores}</p>
        <p>Total Ratings: {stats.totalRatings}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
