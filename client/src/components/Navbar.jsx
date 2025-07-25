import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-transparent flex justify-center gap-25 h-42 text-xl items-center sticky top-0 z-99">
        <Link to={"/about"} className="border rounded-[5px] hover:bg-pink-500 hover:text-white p-3 font-serif bg-white border-white">About</Link>
        <Link to={"/services"} className="border rounded-[5px] hover:bg-pink-500 hover:text-white p-3 font-serif  bg-white">Our Services</Link>
        <Link to={"/stories"} className="border rounded-[5px] hover:bg-pink-500 hover:text-white p-3 font-serif  bg-white">Client Stories</Link>
        <Link to={"/"}>
          <img src={logo} alt="" className="h-[5em]" />    
        </Link>
        <Link to={"/gallery"}className="border rounded-[5px] hover:bg-pink-500 hover:text-white p-3 font-serif  bg-white" >Gallery</Link>
        <Link to={"/contact"} className="border rounded-[5px] hover:bg-pink-500 hover:text-white p-3 font-serif bg-white">Contact Us</Link>
        <button
          className="border p-3 rounded-md hover:bg-pink-500 hover:text-white font-serif w-30 cursor-pointer bg-white"
          onClick={() => navigate("login")}
        >
          {" "}
          Login {" "}
        </button>
      </div>
    </>
  );
};

export default Navbar;