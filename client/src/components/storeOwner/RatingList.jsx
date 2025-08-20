import { useState, useEffect } from "react";
import storeOwnerService from "../../services/storeOwner";

const RatingList = () => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const data = await storeOwnerService.getStoreRatings();
        setRatings(data);
      } catch (err) {
        setError("Failed to fetch ratings");
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, []);

  if (loading) return <div>Loading ratings...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Store Ratings</h2>
      {ratings.length === 0 ? (
        <div>No ratings yet</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Rating</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {ratings.map((rating) => (
              <tr key={rating.id}>
                <td>{rating.user.name}</td>
                <td>{rating.user.email}</td>
                <td>{rating.rating}</td>
                <td>{new Date(rating.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RatingList;
