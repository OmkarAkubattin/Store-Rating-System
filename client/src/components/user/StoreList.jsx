import { useState, useEffect } from "react";
import StoreCard from "./StoreCard";
import storeService from "../../services/stores";

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
        setError("Failed to fetch stores");
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, [searchTerm]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Stores</h1>
      <input
        type="text"
        placeholder="Search stores..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        {stores.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </div>
  );
};

export default StoreList;
