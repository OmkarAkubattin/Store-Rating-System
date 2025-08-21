import { useState, useEffect } from "react";
import storeOwnerService from "../../services/storeOwner";
import { Loader2, AlertCircle, Star } from "lucide-react";

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
        setError("⚠️ Failed to fetch ratings");
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
        <span className="ml-2 text-gray-600">Loading ratings...</span>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center gap-2 text-red-600 font-medium bg-red-50 border border-red-200 p-3 rounded-lg">
        <AlertCircle size={18} /> {error}
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">⭐ Store Ratings</h2>

      {ratings.length === 0 ? (
        <div className="text-gray-500 italic text-center py-10">
          No ratings yet
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden shadow-md">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">User</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-center">Rating</th>
                <th className="px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {ratings.map((rating, index) => (
                <tr
                  key={rating.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="px-4 py-2">{rating.user.name}</td>
                  <td className="px-4 py-2">{rating.user.email}</td>
                  <td className="px-4 py-2 text-center flex justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={`${
                          star <= rating.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(rating.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RatingList;
