import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isLogin, isAdmin } = useAuth();
  const [navBg, setNavBg] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation().pathname;

  const NavBarDesign = () => {
    location === "/" || location === "/login" || location === "/register"
      ? setNavBg(false)
      : setNavBg(true);
  };

  const handleClick = () => {
    isAdmin ? navigate("/adminpanel") : navigate("/dashboard");
  };

  useEffect(() => {
    NavBarDesign();
  }, [location]);

  return (
    <nav
      className={`${
        navBg ? "bg-white shadow-md" : "bg-transparent"
      } w-full fixed top-0 z-50 transition-all duration-300`}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between  items-center h-30">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Company Logo" className="h-26" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center  space-x-1">
            <NavLink to="/about" text="About" />
            <NavLink to="/services" text="Our Services" />
            <NavLink to="/stories" text="Client Stories" />
            <NavLink to="/gallery" text="Gallery" />
            <NavLink to="/contact" text="Contact Us" />
            
            {isLogin ? (
              <div
                className="flex items-center ml-4 cursor-pointer group"
                onClick={handleClick}
              >
                <img
                  src={user.photo}
                  alt="User"
                  className="h-10 w-10 rounded-full object-cover border-2 border-pink-500 group-hover:border-pink-600 transition"
                />
                <span className="ml-2 text-pink-600 font-medium group-hover:text-pink-700 transition">
                  {user.fullName}
                </span>
              </div>
            ) : (
              <button
                onClick={() => navigate("login")}
                className="ml-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-lg rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl"
              >
                Plan Your Event
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {isLogin && (
              <div
                className="flex items-center mr-4 cursor-pointer"
                onClick={handleClick}
              >
                <img
                  src={user.photo}
                  alt="User"
                  className="h-8 w-8 rounded-full object-cover border-2 border-pink-500"
                />
              </div>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-pink-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden bg-white shadow-lg rounded-b-lg`}
      >
        <div className="px-2  pt-2 pb-3 space-y-1 sm:px-3">
          <MobileNavLink to="/about" text="About" />
          <MobileNavLink to="/services" text="Our Services" />
          <MobileNavLink to="/stories" text="Client Stories" />
          <MobileNavLink to="/gallery" text="Gallery" />
          <MobileNavLink to="/contact" text="Contact Us" />
          {!isLogin && (
            <button
              onClick={() => {
                navigate("login");
                setIsMenuOpen(false);
              }}
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-white bg-pink-500 hover:bg-pink-600"
            >
              Login to Plan Your Event
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

// Reusable component for desktop nav links
const NavLink = ({ to, text }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`${
        isActive
          ? "text-pink-600 border-b-2 border-pink-500"
          : "text-gray-700 hover:text-pink-600"
      } px-3 py-2 text-lg font-medium transition-colors duration-200`}
    >
      {text}
    </Link>
  );
};

// Reusable component for mobile nav links
const MobileNavLink = ({ to, text }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`${
        isActive
          ? "bg-pink-50 text-pink-600"
          : "text-gray-700 hover:bg-gray-100 hover:text-pink-600"
      } block px-3 py-2 rounded-md text-base font-medium`}
    >
      {text}
    </Link>
  );
};

export default Navbar;