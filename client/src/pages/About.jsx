import React from "react";
import { motion } from "framer-motion";
import { FaRegSmileBeam, FaUserTie, FaGlassCheers } from "react-icons/fa";

const About = () => {
  return (
    <section className="relative mt-22 py-16 bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900"
        >
          About{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
            Our Event Planner
          </span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
        >
          We create unforgettable moments that last a lifetime. From elegant
          weddings to corporate gatherings, our team ensures every detail is
          crafted with passion, creativity, and professionalism.
        </motion.p>

        {/* Features */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {/* Card 1 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition"
          >
            <FaRegSmileBeam className="text-pink-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Memorable Events
            </h3>
            <p className="text-gray-600">
              We specialize in creating experiences that your guests will
              remember forever.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition"
          >
            <FaUserTie className="text-pink-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Professional Team
            </h3>
            <p className="text-gray-600">
              Our expert planners and designers handle every detail with care
              and precision.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition"
          >
            <FaGlassCheers className="text-pink-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Elegant Designs
            </h3>
            <p className="text-gray-600">
              From floral arrangements to stage setup, we bring sophistication
              and beauty to your event.
            </p>
          </motion.div>
        </div>

        {/* Image Gallery (9 Images) */}
       {/* Image Gallery (9 Images) */}
<div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-6">
  {[
    "https://images.unsplash.com/photo-1519741497674-611481863552",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1522336572468-97b06e8ef143",
              "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",

    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
  ].map((img, index) => (
    <motion.img
      key={index}
      src={img}
      alt={`Event ${index + 1}`}
      className="w-full h-64 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    />
  ))}
</div>
      </div>
    </section>
  );
};

export default About;
