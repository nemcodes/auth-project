import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";

const DashboardPage = () => {
  const handleLogout = () => {
    useAuthStore.getState().logout();
  }
  const { user } = useAuthStore();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6 }}
      className="max-w-md w-full mx-auto mt-20 p-8
      bg-gray-900 bg-opacity-80 backdrop-blur-lg rounded-xl shadow-2xl border 
      border-gray-800 "
    >
      <h1
        className="text-3xl font-bold bg-gradient-to-r
         from-black via-purple-900 to-black mb-6 text-center text-transparent bg-clip-text"
      >
        Dashboard
      </h1>
      <div className="space-y-6 ">
        <motion.div
          className="p-4 bg-gray-800 rounded-lg bg-opacity-50 border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-xl font-semibold text-purple-400 mb-3">
            {" "}
            Profile Information
          </h3>
          <p className="text-gray-300 "> Name:{user.name}</p>
          <p className="text-gray-300 "> Email:{user.email}</p>
        </motion.div>
        <motion.div
          className="p-4 bg-gray-800 rounded-lg bg-opacity-50 border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-xl font-semibold text-purple-400 mb-3">
            {" "}
            Account Activity
          </h3>
          <p className="text-gray-300 ">
            <span className="font-bold">Joined:{""}</span>
            {""}
            {formatDate(user.createdAt)}
          </p>

          <p className="text-gray-300 ">
            <span className="font-bold">Last Login:</span>
            {formatDate(user.lastLogin)}
          </p>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        
        className="mt-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold
           rounded-lg shadow-md transition-colors duration-300 focus:outline-none
            focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        >
          Logout
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;
