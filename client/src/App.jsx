import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ChangePassword from "./components/auth/ChangePassword";
import StoreList from "./components/user/StoreList";
import AdminDashboard from "./components/admin/Dashboard";
import UserList from "./components/admin/UserList";
import UserDetails from "./components/admin/UserDetails";
import StoreListAdmin from "./components/admin/StoreList";
import CreateUser from "./components/admin/CreateUser";
import CreateStore from "./components/admin/CreateStore";
import OwnerDashboard from "./components/storeOwner/Dashboard";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import Layout from "./components/shared/Layout";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<Layout />}>
            <Route
              path="/change-password"
              element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />

            {/* User routes */}
            <Route
              path="/user/stores"
              element={
                <ProtectedRoute allowedRoles={["user", "admin", "store_owner"]}>
                  <StoreList />
                </ProtectedRoute>
              }
            />

            {/* Admin routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <UserList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users/:id"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <UserDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/stores"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <StoreListAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/create-user"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <CreateUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/create-store"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <CreateStore />
                </ProtectedRoute>
              }
            />

            {/* Store owner routes */}
            <Route
              path="/store-owner/dashboard"
              element={
                <ProtectedRoute allowedRoles={["store_owner"]}>
                  <OwnerDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <StoreList />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
