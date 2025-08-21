import { useState } from "react";
import { useNavigate } from "react-router-dom";
import adminService from "../../services/admin";
import {
  validateName,
  validateEmail,
  validatePassword,
  validateAddress,
} from "../../utils/validation";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("user");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!validateName(name)) {
      newErrors.name = "Name must be between 20-60 characters";
    }
    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!validatePassword(password)) {
      newErrors.password =
        "Password must be 8-16 chars with uppercase and special character";
    }
    if (!validateAddress(address)) {
      newErrors.address = "Address must be less than 400 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await adminService.createUser({ name, email, password, address, role });
      setSuccess(true);
      setTimeout(() => navigate("/admin/users"), 2000);
    } catch (error) {
      setErrors({ form: error.message || "User creation failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Create New User
        </h1>

        {errors.form && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg">
            {errors.form}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
            User created successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 font-medium">Address</label>
            <textarea
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            {errors.address && (
              <p className="text-sm text-red-500">{errors.address}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-gray-700 font-medium">Role</label>
            <select
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">Normal User</option>
              <option value="admin">Admin</option>
              <option value="store_owner">Store Owner</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {loading ? "Creating..." : "Create User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
