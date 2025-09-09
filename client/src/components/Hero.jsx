import React from "react";
import { motion } from "framer-motion";
import background from "../assets/back4.jpg";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Services from "../pages/Service";
import Gallery from "../pages/Gallery"; 

const Hero = () => {
  return (

    <>
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src={background}
        alt="wedding"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80"
      />

      {/* Content */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 text-center text-white px-6 mt-24"
      >
        {/* Animated Heading */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold drop-shadow-lg"
        >
          <motion.span
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500"
          >
            Celebrate Love
          </motion.span>{" "}
          <motion.span
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="text-pink-300"
          >
            with Elegance
          </motion.span>
        </motion.h1>

        {/* Sub Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-8 text-lg md:text-2xl font-light max-w-2xl mx-auto text-gray-200"
        >
          Turning your dream wedding into a timeless celebration filled with
          beauty, joy, and unforgettable memories.
        </motion.p>

        {/* Buttons */}
        <div className="mt-12 flex justify-center gap-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-7 py-3 rounded-xl bg-white text-black font-semibold shadow-lg hover:bg-pink-500 hover:text-white transition"
          >
            Book Now
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-7 py-3 rounded-xl bg-pink-500 text-white font-semibold shadow-lg hover:bg-white hover:text-black transition"
          >
            Read More
          </motion.button>
        </div>
      </motion.div>
  
    </div>

    
    <About />
    <Services />
    <Gallery />
    <Contact />
   

    </>
    
 
  );
};

export default Hero;
