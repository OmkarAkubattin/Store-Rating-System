import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../services/users";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await userService.getUsers(searchTerm, roleFilter);
        setUsers(data.data);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [searchTerm, roleFilter]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Users</h1>
      <div>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="store_owner">Store Owner</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => navigate(`/admin/users/${user.id}`)}>
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
