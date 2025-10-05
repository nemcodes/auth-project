import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-900 relative overflow-hidden
     bg-gradient-to-br 
    from-black via-purple-900 to-black"
    >
      {/* Add your loading spinner or animation here */}
      <motion.div
        className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
        
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
     
    </div>
  );
};

export default LoadingSpinner;
