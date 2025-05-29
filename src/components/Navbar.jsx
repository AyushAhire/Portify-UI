import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth } from "../util/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";

function Navbar() {
  const [theme, setTheme] = useState("light");
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(""); // new notification state
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/");
  };

  // New handler for Portfolio clicks
  const handlePortfolioClick = (e) => {
    if (!user) {
      e.preventDefault(); // prevent navigation
      setNotification("Please login to access the Portfolio.");
      setTimeout(() => setNotification(""), 4000); // hide after 4 seconds
    }
  };

  return (
    <>
      {/* Notification banner */}
      {notification && (
        <div
          className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 bg-pink-200 text-pink-900 font-semibold px-6 py-3 rounded-lg shadow-lg animate-fadeInOut"
          role="alert"
        >
          {notification}
        </div>
      )}

      <div
        className={`navbar sticky top-0 z-50 transition-all duration-500 border-b border-base-300/30 
          ${
            isScrolled
              ? "bg-base-100/50 shadow-lg backdrop-blur-md hover:bg-base-100/60"
              : "bg-base-100/10 hover:bg-base-100/30 backdrop-blur-sm"
          }`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden hover:bg-base-300/50 hover:rotate-3 
                  transition-all duration-300 backdrop-blur-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transition-all duration-300 hover:scale-110 hover:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100/70 backdrop-blur-md 
                  rounded-box w-52 transition-all duration-300 origin-top-left animate-slideDown border border-base-300/30"
            >
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `font-bold hover:text-primary hover:translate-x-2 transition-all duration-200 
                     hover:bg-base-200/50 hover:shadow-[0_0_15px] hover:shadow-primary/20 ${
                       isActive ? "text-primary" : ""
                     }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/riskform"
                  onClick={handlePortfolioClick} // <-- add click handler here
                  className={({ isActive }) =>
                    `font-bold hover:text-primary hover:translate-x-2 transition-all duration-200 
                     hover:bg-base-200/50 hover:shadow-[0_0_15px] hover:shadow-primary/20 ${
                       isActive ? "text-primary" : ""
                     }`
                  }
                >
                  Portfolio
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `hover:text-primary hover:translate-x-2 transition-all duration-200 hover:bg-base-200/50 ${
                      isActive ? "text-primary" : ""
                    }`
                  }
                >
                  About
                </NavLink>
              </li>
            </ul>
          </div>
          <Link
            to="/"
            className="btn btn-ghost text-2xl md:text-3xl font-bold transition-all duration-200 
              hover:text-primary hover:scale-105 
              relative overflow-hidden group text-center"
          >
            <span className="relative z-10">
              Porti<span className="text-secondary">FY</span>
            </span>
            <div
              className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 
                  opacity-0 group-hover:opacity-100 transition-all duration-200 
                  blur-md"
            ></div>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `font-bold hover:text-primary transition-all duration-300 rounded-lg hover:bg-base-200/50 
                  hover:scale-105 hover:-translate-y-1 backdrop-blur-sm hover:shadow-[0_0_15px] hover:shadow-primary/20 
                  ${isActive ? "text-primary" : ""}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/riskform"
                onClick={handlePortfolioClick} // <-- and here
                className={({ isActive }) =>
                  `font-bold hover:text-primary transition-all duration-300 rounded-lg hover:bg-base-200/50 
                  hover:scale-105 hover:-translate-y-1 backdrop-blur-sm hover:shadow-[0_0_15px] hover:shadow-primary/20
                  ${isActive ? "text-primary" : ""}`
                }
              >
                Portfolio
              </NavLink>
            </li>
            {/* Add more links here if needed */}
          </ul>
        </div>

        <div className="navbar-end flex items-center">
          {user && (
            <button
              onClick={handleLogout}
              className="font-bold btn btn-sm
                bg-pink-200 text-pink-700
                hover:bg-pink-300 hover:text-pink-900
                transition-all duration-300 rounded-lg
                hover:scale-105 hover:-translate-y-1
                backdrop-blur-sm hover:shadow-[0_0_15px] hover:shadow-pink-300"
              title="Sign Out"
            >
              Sign Out
            </button>
          )}

          <label className="swap swap-rotate mx-4 hover:scale-125 transition-all duration-300 hover:rotate-180 p-2 
              rounded-full hover:bg-base-200/30 backdrop-blur-sm">
            <input onClick={toggleTheme} type="checkbox" />
            <span className="swap-on material-symbols-outlined text-2xl animate-fadeIn">
              dark_mode
            </span>
            <span className="swap-off material-symbols-outlined text-2xl animate-fadeIn">
              light_mode
            </span>
          </label>
        </div>
      </div>
    </>
  );
}

export default Navbar;
