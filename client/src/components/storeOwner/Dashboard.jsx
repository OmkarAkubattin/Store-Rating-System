import { useState, useEffect } from "react";
import storeOwnerService from "../../services/storeOwner";

const OwnerDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await storeOwnerService.getStoreStats();
        setStats(data);
      } catch (err) {
        setError("Failed to load store stats");
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
      <h1>Store Owner Dashboard</h1>
      <div>
        <h2>Store: {stats.store.name}</h2>
        <p>Address: {stats.store.address}</p>
        <p>Average Rating: {stats.averageRating || "No ratings yet"}</p>
        <p>Total Ratings: {stats.totalRatings}</p>
      </div>
    </div>
  );
};

export default OwnerDashboard;
