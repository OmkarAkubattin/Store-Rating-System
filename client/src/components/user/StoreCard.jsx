import { useState } from "react";
import ratingService from "../../services/ratings";

const StoreCard = ({ store }) => {
  const [userRating, setUserRating] = useState(store.userRating || null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitRating = async (rating) => {
    setLoading(true);
    setError("");
    try {
      if (userRating) {
        await ratingService.updateRating(store.id, rating);
      } else {
        await ratingService.submitRating(store.id, rating);
      }
      setUserRating(rating);
      setEditing(false);
    } catch (err) {
      setError("Failed to submit rating");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{store.name}</h2>
      <p>{store.address}</p>
      <p>Average Rating: {store.averageRating || "No ratings yet"}</p>

      {editing ? (
        <div>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => submitRating(star)}
              disabled={loading}
            >
              {star}
            </button>
          ))}
        </div>
      ) : (
        <div>
          {userRating ? <p>Your rating: {userRating}</p> : <p>Not rated yet</p>}
          <button onClick={() => setEditing(true)} disabled={loading}>
            {userRating ? "Change Rating" : "Rate Store"}
          </button>
        </div>
      )}
      {error && <div>{error}</div>}
    </div>
  );
};

export default StoreCard;
