import { useState } from "react";
import { Star, Loader2 } from "lucide-react"; // icons
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
    <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md mx-auto border border-gray-200 hover:shadow-lg transition">
      <h2 className="text-xl font-semibold text-gray-800">{store.name}</h2>
      <p className="text-gray-500">{store.address}</p>
      <p className="mt-2 text-sm text-gray-700">
        ⭐ Average Rating:{" "}
        <span className="font-medium">
          {store.averageRating || "No ratings yet"}
        </span>
      </p>

      <div className="mt-4">
        {editing ? (
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => submitRating(star)}
                disabled={loading}
                className={`p-2 rounded-full transition ${
                  userRating >= star ? "text-yellow-500" : "text-gray-400"
                } hover:text-yellow-600`}
              >
                <Star
                  size={28}
                  fill={userRating >= star ? "currentColor" : "none"}
                />
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {userRating ? (
              <p className="text-gray-700">
                ✅ Your rating:{" "}
                <span className="font-semibold text-yellow-600">
                  {userRating}
                </span>
              </p>
            ) : (
              <p className="text-gray-500 italic">Not rated yet</p>
            )}
            <button
              onClick={() => setEditing(true)}
              disabled={loading}
              className="px-4 py-2 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading && <Loader2 className="animate-spin w-4 h-4" />}
              {userRating ? "Change Rating" : "Rate Store"}
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-3 text-red-500 text-sm font-medium">{error}</div>
      )}
    </div>
  );
};

export default StoreCard;
