import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../components/input";
import { Lock } from "lucide-react";
import { toast } from "react-hot-toast";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword, error, isLoading, message } = useAuthStore();

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await resetPassword(token, password);
      toast.success("Password reset successful! Redirecting to login page...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to reset password. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl
      rounded-2xl shadow-lg mx-auto "
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-purple-300 text-center">
          Reset Password
        </h2>
        {message && <div className="text-purple-500 mb-4">{message}</div>}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <Input
            icon={Lock}
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700
            text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline 
            focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 
            transition duration-200 mt-4"
          >
            {isLoading ? "Resetting..." : "Set New Password"}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default ResetPasswordPage;
