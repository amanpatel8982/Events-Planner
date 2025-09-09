import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

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
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`${
        navBg ? "bg-white shadow-md" : "bg-gradient-to-r from-pink-50 to-purple-50"
      } w-full fixed top-0 z-50 transition-all duration-300`}
    >
      <div className="max-w-8xl mx-auto px-4  sm:px-6 lg:px-8">
        <div className="flex justify-between ms-10 items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <motion.img
              src={logo}
              alt="Company Logo"
              className="h-25"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center font-serif space-x-2">
            <NavLink to="/about" text="About" />
            <NavLink to="/service" text="Our Services" />
            <NavLink to="/gallery" text="Gallery" />
            <NavLink to="/contact" text="Contact Us" />

            {isLogin ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                onClick={handleClick}
                className="flex items-center ml-4 cursor-pointer"
              >
                <img
                  src={user.photo}
                  alt="User"
                  className="h-10 w-10 rounded-full object-cover border-2 border-pink-500"
                />
                <span className="ml-2 text-pink-600 font-semibold">
                  {user.fullName}
                </span>
              </motion.div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("login")}
                className="ml-4 px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Plan Your Event
              </motion.button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {isLogin && (
              <div
                className="flex items-center mr-3 cursor-pointer"
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
                className="h-7 w-7"
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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : -20 }}
        transition={{ duration: 0.4 }}
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden bg-white shadow-lg rounded-b-lg`}
      >
        <div className="px-3 pt-3 pb-5 space-y-2">
          <MobileNavLink to="/about" text="About" setIsMenuOpen={setIsMenuOpen} />
          <MobileNavLink
            to="/services"
            text="Our Services"
            setIsMenuOpen={setIsMenuOpen}
          />
          <MobileNavLink
            to="/stories"
            text="Client Stories"
            setIsMenuOpen={setIsMenuOpen}
          />
          <MobileNavLink
            to="/gallery"
            text="Gallery"
            setIsMenuOpen={setIsMenuOpen}
          />
          <MobileNavLink
            to="/contact"
            text="Contact Us"
            setIsMenuOpen={setIsMenuOpen}
          />
          {!isLogin && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                navigate("login");
                setIsMenuOpen(false);
              }}
              className="w-full px-4 py-2 rounded-lg bg-pink-500 text-white font-semibold hover:bg-pink-600"
            >
              Login to Plan Your Event
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.nav>
  );
};

// Reusable Desktop NavLink
const NavLink = ({ to, text }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
      <Link
        to={to}
        className={`${
          isActive
            ? "text-pink-600 border-b-2 border-pink-500"
            : "text-gray-700 hover:text-pink-600"
        } px-3 py-2 text-lg font-medium transition-all`}
      >
        {text}
      </Link>
    </motion.div>
  );
};

// Reusable Mobile NavLink
const MobileNavLink = ({ to, text, setIsMenuOpen }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <motion.div whileTap={{ scale: 0.97 }}>
      <Link
        to={to}
        onClick={() => setIsMenuOpen(false)}
        className={`${
          isActive
            ? "bg-pink-100 text-pink-600"
            : "text-gray-700 hover:bg-gray-100 hover:text-pink-600"
        } block px-3 py-2 rounded-md text-base font-medium`}
      >
        {text}
      </Link>
    </motion.div>
  );
};

export default Navbar;
