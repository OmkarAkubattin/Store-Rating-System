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
    <div>
      <h1>Create New User</h1>
      {errors.form && <div>{errors.form}</div>}
      {success && <div>User created successfully!</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && <div>{errors.name}</div>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <div>{errors.email}</div>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <div>{errors.password}</div>}
        </div>
        <div>
          <label>Address:</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          {errors.address && <div>{errors.address}</div>}
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">Normal User</option>
            <option value="admin">Admin</option>
            <option value="store_owner">Store Owner</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
