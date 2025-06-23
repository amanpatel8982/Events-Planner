import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className=" bg-transperent h-35 w-full flex items-center absolute top-0 right-0 justify-around">
        <ul className="flex justify-center gap-14 text-[16px]  font-medium">
          <li><Link className="text-black" to={"/"}>HOME</Link></li>
          <li><Link className="text-black" to={"about"}>ABOUT</Link></li>
          <li><Link className="text-black" to={"stories"}>STORIES</Link></li>
          <li><Link className="text-black" to={"morePages"}>MOREPAGES</Link></li>
          <li><Link className="text-black" to={"wedding"}>WEDDING</Link></li>
          <li><Link className="text-black" to={"services"}>SERVICES</Link></li>
          <li><Link className="text-black" to={"gallery"}>GALLERY</Link></li>
          <li><Link className="text-black" to={"element"}>ELEMENT</Link></li>
          <li><Link className="text-black" to={"contact"}>CONTACT</Link></li>
          <li><Link className="text-black" to="/login">LOGIN</Link></li>

        </ul>
      </nav>

    </>
  );
};

export default Navbar;
