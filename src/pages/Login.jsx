// src/pages/Login.jsx
import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../util/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google login success:", user);
      sessionStorage.setItem("token", user.accessToken);
      navigate("/riskform");
    } catch (err) {
      console.error("Google login failed", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[90vh]">
      <h1 className="text-3xl font-bold mb-6">Sign In</h1>
      <button
        onClick={handleGoogleLogin}
        className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
