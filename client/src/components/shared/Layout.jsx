import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../../context/AuthContext";

const Layout = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <Navbar user={user} onLogout={logout} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
