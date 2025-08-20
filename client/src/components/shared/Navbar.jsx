import { Link } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  return (
    <nav>
      <div>
        <Link to="/">Home</Link>
        {user && (
          <>
            {user.role === "admin" && (
              <>
                <Link to="/admin/dashboard">Admin Dashboard</Link>
                <Link to="/admin/users">Users</Link>
                <Link to="/admin/stores">Stores</Link>
              </>
            )}
            {user.role === "store_owner" && (
              <Link to="/store-owner/dashboard">My Store</Link>
            )}
            <Link to="/user/stores">Stores</Link>
            <Link to="/change-password">Change Password</Link>
            <button onClick={onLogout}>Logout</button>
          </>
        )}
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
      {user && (
        <div>
          Logged in as: {user.name} ({user.role})
        </div>
      )}
    </nav>
  );
};

export default Navbar;
