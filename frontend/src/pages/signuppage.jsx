import { motion } from "framer-motion";
import {  useState } from "react";
import Input from "../components/Input";
import { User, Mail, Lock, Loader} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/passwordstrengthmeter";
import {useAuthStore} from '../store/authStore';

const SignUppage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {signup, error, isLoading} = useAuthStore();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

try {
  await signup(email, password, name);
  navigate('/verify-email');
} catch (error) {
  console.log(error)
}

  };



  return (
   
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className="max-w-md w-full bg-purple-300 bg-opacity-50 backdrop-blur-xl
   rounded-2xl shadow-xl overflow-hidden  mx-auto "
    >
      <div className="p-8">
        <h2
          className="text-3xl font-bold mb-6 text-center bg-gradient-to-r
         from-black via-purple-900 to-black text-transparent bg-clip-text"
        >
          Create Account
        </h2>
        <form onSubmit={handleSignUp}>
          <Input
            icon={User}
            type="text"
            placeholder=" Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Set Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <PasswordStrengthMeter password={password} />

      <motion.button className="mt-5 w-full py-3 bg-purple-600 hover:bg-purple-700
       text-white font-semibold rounded-lg shadow-lg transition duration-200 hover:shadow-xl 
       focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        whileHover={{ scale: 1.02 }}  whileTap={{ scale: 0.98 }} type='submit'
        disabled={isLoading}
        >
        {isLoading ? < Loader className="animate-spin mx-auto" size={24} /> : "Sign Up"}
      </motion.button>
        </form>
      </div>
      <div className="bg-purple-600 text-white text-center py-4">
        <p>Already have an account? 
          <Link to={'/login'} className='text-purple-300 hover:underline'> Login</Link> </p>
      </div>
    </motion.div>
 
  );
};

export default SignUppage;
