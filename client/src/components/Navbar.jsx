import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
    <div className="bg-[url('bg-homepage.jpg')] h-200 bg-no-repeat object-fill bg-center bg-cover">
      <nav className=" h-35 flex items-center justify-around">
        <ul className="flex justify-center gap-14 text-[16px]  font-medium">
          <li><Link className="text-white" to={"/"}>HOME</Link></li>
          <li><Link className="text-white" to={"about"}>ABOUT</Link></li>
          <li><Link className="text-white" to={"stories"}>STORIES</Link></li>
          <li><Link className="text-white" to={"morePages"}>MOREPAGES</Link></li>
          <li><Link className="text-white" to={"wedding"}>WEDDING</Link></li>
          <li><Link className="text-white" to={"Services"}>SERVICES</Link></li>
          <li><Link className="text-white" to={"gallery"}>GALLERY</Link></li>
          <li><Link className="text-white" to={"element"}>ELEMENT</Link></li>
          <li><Link className="text-white" to={"contact"}>CONTACT</Link></li>
        </ul>
      </nav>

      <div className=" ">
        <h1 className="text-white text-7xl flex justify-center mt-14 font-extrabold">Turning Dreams <br /> into Reality</h1>
      </div>
      </div>
    </>
  );
};

export default Navbar;
