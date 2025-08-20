import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth";
import { validatePassword } from "../../utils/validation";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!validatePassword(newPassword)) {
      newErrors.newPassword =
        "Password must be 8-16 chars with uppercase and special character";
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await authService.changePassword(currentPassword, newPassword);
      setSuccess(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setErrors({ form: error.message || "Password change failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Change Password</h1>
      {errors.form && <div>{errors.form}</div>}
      {success && <div>Password changed successfully!</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Current Password:</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          {errors.currentPassword && <div>{errors.currentPassword}</div>}
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          {errors.newPassword && <div>{errors.newPassword}</div>}
        </div>
        <div>
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.confirmPassword && <div>{errors.confirmPassword}</div>}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
