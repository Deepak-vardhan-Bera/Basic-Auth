import { motion } from 'framer-motion';
import React, { useState } from 'react';
import Input from '../components/inputs';
import { Lock, Mail, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../Store/authStore';

const LoginPage = () => {
  const [email, setEmail] = useState(""); // Changed setemail to setEmail
  const [password, setPassword] = useState(""); // Changed setpassword to setPassword
  const [errorMessage, setErrorMessage] = useState(null); // Avoid uppercase 'Error'
  const { login, error, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Fixed missing event
    console.log("Login calling");

    try {
      await login(email, password);
      console.log("Successfull");
      
      navigate('/');
    } catch  {
      setErrorMessage(error || 'An error occurred during login.');
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md overflow-hidden bg-gray-800 bg-opacity-50 shadow-xl backdrop-filter backdrop-blur-xl rounded-2xl"
    >
      <div className="px-5 pt-5">
        <h2 className="mb-6 text-3xl font-bold text-center text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin}>
          <Input
            icon={Mail}
            type="email"
            placeholder="Email"
            value={email} // Controlled input for email
            onChange={(e) => setEmail(e.target.value)} // Proper state update
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password} // Controlled input for password
            onChange={(e) => setPassword(e.target.value)} // Proper state update
          />

          <p
            className="px-2 text-green-500 cursor-pointer hover:underline"
            onClick={() => navigate('/forgot-password')}
          >
            Forgot Password
          </p>
          {errorMessage && (
            <p className="mt-2 font-serif text-red-500">{errorMessage}</p>
          )}

          <motion.button
            className="w-full px-4 py-3 mt-5 font-bold text-white transition duration-200 rounded-lg shadow-lg my-7 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="mx-auto animate-spin" size={24} />
            ) : (
              'Login'
            )}
          </motion.button>
        </form>
      </div>

      <div className="flex justify-center w-full bg-gray-800">
        <p className="py-2 text-gray-400">Don't Have An Account?</p>
        <p
          className="p-2 text-green-500 cursor-pointer hover:underline"
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </p>
      </div>
    </motion.div>
  );
};

export default LoginPage;
