import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import adminService from "../../services/admin";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await adminService.getUserDetails(id);
        setUser(data.data);
      } catch (err) {
        setError("Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-lg font-medium text-gray-600">
        Loading user details...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-500 font-semibold">
        {error}
      </div>
    );

  if (!user)
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 font-medium">
        User not found
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-6">
          User Details
        </h1>

        {/* User Info */}
        <div className="space-y-3">
          <p className="text-gray-700">
            <span className="font-semibold">Name:</span> {user.name}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Address:</span> {user.address}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Role:</span>{" "}
            <span
              className={`px-2 py-1 rounded-md text-sm font-medium ${
                user.role === "admin"
                  ? "bg-red-100 text-red-700"
                  : user.role === "store_owner"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {user.role}
            </span>
          </p>
        </div>

        {/* Store Info (if store_owner) */}
        {user.role === "store_owner" && user.store && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
              Store Information
            </h2>
            <div className="space-y-3">
              <p className="text-gray-700">
                <span className="font-semibold">Store Name:</span>{" "}
                {user.store.name}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Store Email:</span>{" "}
                {user.store.email}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Store Address:</span>{" "}
                {user.store.address}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Average Rating:</span>{" "}
                {user.averageRating || "No ratings yet"}
              </p>
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={() => navigate("/admin/users")}
            className="px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Back to Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
