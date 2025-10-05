import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import Input from "../components/input";
import { Mail, ArrowLeft, Loader } from "lucide-react";
import { Link } from "react-router-dom";


export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isLoading, forgotPassword } = useAuthStore();
  const [timeLeft, setTimeLeft] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
    setTimeLeft(40); // start countdown after first submit
  };

  // countdown effect
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl
      overflow-hidden mx-auto mt-20"
    >
      <div className="p-8">
        <h2
          className="text-3xl font-semibold text-white mb-6 text-transparent bg-clip-text text-center"
        >
          Forgot Password
        </h2>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <p className="text-purple-400 mb-4 text-center">
              Enter your email to receive a password reset link.
            </p>

            <Input
              icon={Mail}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              placeholder="Email address"
              required
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
              className="w-full py-3 px-4 bg-purple-600 text-white font-semibold rounded-lg shadow-md
                hover:bg-purple-500 focus:outline-none focus:ring-3 focus:ring-purple-300 
                focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-300
                disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
            >
              {isLoading ? (
                <Loader className="animate-spin h-5 w-5 text-white mx-auto" />
              ) : (
                "Send Reset Link"
              )}
            </motion.button>
          </form>
        ) : (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-15 h-15 bg-purple-500 rounded-full 
                flex items-center justify-center mx-auto mb-4"
            >
              <Mail className=" h-8 w-8 text-white" />
            </motion.div>
            <p className="text-purple-400 mb-6">
              If an account exists for <span className="font-semibold">{email}</span>, you will receive a reset link shortly!
            </p>

            {/* Resend Button with Timer */}
            <motion.button
              whileHover={{ scale: timeLeft > 0 ? 1 : 1.05 }}
              whileTap={{ scale: timeLeft > 0 ? 1 : 0.95 }}
              disabled={timeLeft > 0}
              onClick={handleSubmit}
              className={`w-auto mx-auto py-3 px-4 rounded-lg font-semibold shadow-md transition duration-300
                ${
                  timeLeft > 0
                    ? "bg-gray-500 cursor-not-allowed text-gray-300"
                    : "bg-purple-600 hover:bg-purple-500 text-white"
                }`}
            >
              {timeLeft > 0
                ? `Wait ${timeLeft}s to resend`
                : "Resend Reset Link"}
            </motion.button>
          </div>
        )}
      </div>

      <div className="px-8 py-4 bg-gray-900 opacity-50 flex justify-center">
        <Link to="/login" className="text-purple-400 hover:underline flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Login
        </Link>
      </div>
    </motion.div>
  );
};

export default ForgotPasswordPage;
