import { useState, useRef,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";

const VerifyEmail = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef([]);
  const navigate = useNavigate();
    


  const {error, isLoading, verificateEmail}=useAuthStore();
  const handleChange = (index, value) => {
    const newCode = [...code];

    // If user pastes multiple digits directly into one box
    if (value.length > 1) {
      const pastedValues = value.slice(0, 6 - index).split("");
      pastedValues.forEach((char, i) => {
        newCode[index + i] = char;
      });
      setCode(newCode);

      // Move focus to next empty input
      const nextIndex = index + pastedValues.length;
      if (nextIndex < 6) {
        inputRef.current[nextIndex].focus();
      }
      return;
    }

    // Normal single digit input
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handlePaste = (index, e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, 6 - index).split("");
    const newCode = [...code];

    pasted.forEach((char, i) => {
      newCode[index + i] = char;
    });

    setCode(newCode);

    // Move focus to the last filled box
    const lastIndex = index + pasted.length - 1;
    if (lastIndex < 6) {
      inputRef.current[lastIndex].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verificateEmail(verificationCode);
      navigate("/");
      toast.success("Email verified successfully!");
    } catch (error) {
      console.log(error);
    }
  };

    //auto submit when all fields are filled
    useEffect(() => {
  if (code.every((digit) => digit !== "") && !isLoading) {
    handleSubmit(new Event("submit"));
  }
}, [code, isLoading]);


  return (
    <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl
      rounded-2xl shadow-xl overflow-hidden mx-auto mt-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl
         p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-100 ">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Enter the 6-digit code sent to your email address.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  if (el) inputRef.current[index] = el;
                }}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={(e) => handlePaste(index, e)}
                className="w-12 h-12 text-center text-2xl font-bold rounded-lg bg-gray-700 text-white 
                  border-2 border-gray-300 focus:border-purple-500 focus:outline-none"
              />
            ))}
          </div>
{error&& <p className="text-red-500 text-center">{error}</p>}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading || code.some((digit) => !digit)}
            className="mt-5 w-full py-3 bg-purple-600 hover:bg-purple-700
              text-white font-semibold rounded-lg shadow-lg transition duration-200 hover:shadow-xl 
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
