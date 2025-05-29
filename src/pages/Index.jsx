import React, { useEffect, useState } from 'react'
import img1 from "../assets/logo.jpg"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../util/firebase";
import { signOut } from "firebase/auth";
import { checkAuth } from "../util/authStatus";

const Index = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth(setUser); // sets user state if logged in
  }, []);

  // Check if user logged in with Google provider
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
    <>
      <div className='w-full flex flex-row h-full bg-gray-100'>
        <div className='w-[50%] flex flex-col justify-center items-start px-10 py-10'>
          <h1 className='text-xl font-medium ml-1 text-accent '>Welcome to PortiFY</h1>
          <h2 className='text-[3.8rem] font-semibold leading-snug text-gray-800'>
            Get More From Your Finance
          </h2>

          <div className="flex gap-4 mt-3">
            <button
              className="btn btn-primary text-lg transition duration-300 ease-in-out transform hover:scale-105"
              onClick={handleGetStarted}
            >
              Get Started
            </button>

            {!user && (
              <Link
                to="/login"
                className="btn btn-outline btn-secondary text-lg"
              >
                Login
              </Link>
            )}
          </div>

          {user && isGoogleUser() && (
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-error mt-4"
            >
              Sign Out
            </button>
          )}
        </div>

        <div className='w-[50%] flex justify-center items-center'>
          <img src={img1} alt="Finance" className='bg-blend-color mt-4 rounded-lg shadow-lg' />
        </div>
      </div>

      <div className='mx-48 flex flex-col gap-y-2 mt-20'>
        {/* Timeline component is optional */}
      </div>
    </>
  );
};

export default Index;
