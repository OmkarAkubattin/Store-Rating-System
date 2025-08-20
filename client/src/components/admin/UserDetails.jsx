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

  if (loading) return <div>Loading user details...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1>User Details</h1>
      <div>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Address:</strong> {user.address}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>

        {user.role === "store_owner" && user.store && (
          <div>
            <h2>Store Information</h2>
            <p>
              <strong>Store Name:</strong> {user.store.name}
            </p>
            <p>
              <strong>Store Email:</strong> {user.store.email}
            </p>
            <p>
              <strong>Store Address:</strong> {user.store.address}
            </p>
            <p>
              <strong>Average Rating:</strong>{" "}
              {user.averageRating || "No ratings yet"}
            </p>
          </div>
        )}
      </div>
      <button onClick={() => navigate("/admin/users")}>Back to Users</button>
    </div>
  );
};

export default UserDetails;
