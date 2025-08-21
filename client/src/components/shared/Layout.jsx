import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../../context/AuthContext";

const Layout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar */}
      <Navbar user={user} onLogout={logout} />

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-4 mt-auto text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
