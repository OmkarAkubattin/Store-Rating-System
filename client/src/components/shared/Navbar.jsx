import { Link } from "react-router-dom";
import { LogOut, User, Store, Shield, Home } from "lucide-react";

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Left Section - Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-blue-600 flex items-center gap-2"
        >
          <Home size={20} /> StoreFinder
        </Link>

        {/* Center Section - Links */}
        <div className="flex items-center gap-6">
          {user ? (
            <>
              {user.role === "admin" && (
                <>
                  <Link
                    to="/admin/dashboard"
                    className="text-gray-700 hover:text-blue-600 transition"
                  >
                    Admin Dashboard
                  </Link>
                  <Link
                    to="/admin/users"
                    className="text-gray-700 hover:text-blue-600 transition"
                  >
                    Users
                  </Link>
                  <Link
                    to="/admin/stores"
                    className="text-gray-700 hover:text-blue-600 transition"
                  >
                    Stores
                  </Link>
                </>
              )}

              {user.role === "store_owner" && (
                <Link
                  to="/store-owner/dashboard"
                  className="text-gray-700 hover:text-blue-600 transition flex items-center gap-1"
                >
                  <Store size={18} /> My Store
                </Link>
              )}

              <Link
                to="/user/stores"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Stores
              </Link>
              <Link
                to="/change-password"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Change Password
              </Link>
              <button
                onClick={onLogout}
                className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Right Section - User Info */}
        {user && (
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-md">
            <User size={16} />
            {user.name}{" "}
            <span className="text-xs text-gray-500">({user.role})</span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
