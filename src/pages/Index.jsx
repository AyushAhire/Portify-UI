import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../util/firebase"
import { signOut } from "firebase/auth"
import { checkAuth } from "../util/authStatus"
import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation"
import { motion } from "framer-motion"

const Index = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth(setUser);
  }, []);

  const isGoogleUser = () => {
    if (!user || !user.providerData) return false;
    return user.providerData.some(provider => provider.providerId === 'google.com');
  };

  const handleGetStarted = () => {
    if (user) {
      navigate("/riskform");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/");
  };

  return (
    <BackgroundGradientAnimation>
      <div className="flex min-h-screen relative overflow-hidden">
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-12 py-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-xl font-medium text-primary-500 mb-4">
              Welcome to PortiFY
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white leading-tight mb-8">
              Get More From 
              <span className="bg-gradient-to-r from-primary-500 to-purple-500 text-transparent bg-clip-text"> Your Finance</span>
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Transform your investment strategy with AI-powered portfolio optimization
            </p>

            <div className="flex gap-4 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary text-lg px-8"
                onClick={handleGetStarted}
              >
                Get Started
              </motion.button>

              {!user && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/login"
                    className="btn btn-outline btn-secondary text-lg px-8"
                  >
                    Login
                  </Link>
                </motion.div>
              )}

              {user && isGoogleUser() && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="btn btn-outline btn-error text-lg px-8"
                >
                  Sign Out
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>

        <div className="hidden md:flex w-1/2 items-center justify-center p-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-lg"
          >
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Finance Analytics" 
                className="rounded-2xl shadow-2xl w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-purple-500/20 rounded-2xl backdrop-blur-[2px]"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </BackgroundGradientAnimation>
  );
};

export default Index;