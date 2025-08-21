import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth";
import { validatePassword } from "../../utils/validation";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

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
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-xl font-bold text-gray-800 mb-4">
          🔒 Change Password
        </h1>

        {/* Form-level error */}
        {errors.form && (
          <div className="mb-4 flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-md text-sm">
            <AlertCircle size={18} /> {errors.form}
          </div>
        )}

        {/* Success message */}
        {success && (
          <div className="mb-4 flex items-center gap-2 text-green-600 bg-green-50 border border-green-200 px-3 py-2 rounded-md text-sm">
            <CheckCircle2 size={18} /> Password changed successfully!
            Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.currentPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.currentPassword}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.newPassword && (
              <p className="text-sm text-red-500 mt-1">{errors.newPassword}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
