import React from "react";
import background from "../assets/background.jpg";
const Hero = () => {
  return (
    <>
      <div className="mt-[-11%] relative h-224 flex justify-center items-center ">
        <img src={background} alt="" className="absolute inset-0 w-full h-full -z-10 object-cover"/>

        <div className="absolute inset-0 bg-black opacity-20">

        </div>
        <div className="grid gap-20 justify-items-center  bg-gradient-to rounded-xl p-10 w-3/4">
          <h1 className="text-9xl font-black  font-[family-name:var(--customFont)]  text-center  bg-[url('12609.webp')] bg-center bg-contain bg-clip-text text-transparent  p-3">
          </h1>
          <div className="flex gap-10 ">
            <button className="rounded px-4 py-3 relative font-extrabold bottom-15 text-black  bg-white hover:bg-yellow-600 border-2">Book Now</button>
          <button className="rounded px-5 py-3 font-extrabold bg-white relative bottom-15 text-black border-3 border-black hover:bg-yellow-600 hover:text-white">Read More</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;