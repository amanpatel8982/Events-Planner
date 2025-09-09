import React from "react";
import { motion } from "framer-motion";
import {
  FaRing,
  FaCameraRetro,
  FaMusic,
  FaUtensils,
  FaCar,
  FaPalette,
  FaHotel,
  FaGlassCheers,
  FaGift,
  FaLightbulb,
} from "react-icons/fa";

const Service = () => {
  const services = [
    {
      icon: <FaRing className="text-pink-500 text-5xl mb-4" />,
      title: "Wedding Planning",
      desc: "Complete wedding planning from venue selection to final execution with elegance.",
    },
    {
      icon: <FaCameraRetro className="text-pink-500 text-5xl mb-4" />,
      title: "Photography & Videography",
      desc: "Capture every special moment with our expert photographers and cinematographers.",
    },
    {
      icon: <FaMusic className="text-pink-500 text-5xl mb-4" />,
      title: "Entertainment",
      desc: "Live bands, DJs, and cultural performances to keep your guests entertained.",
    },
    {
      icon: <FaUtensils className="text-pink-500 text-5xl mb-4" />,
      title: "Catering Services",
      desc: "Delicious multi-cuisine menu tailored to your preferences with premium service.",
    },
    {
      icon: <FaCar className="text-pink-500 text-5xl mb-4" />,
      title: "Luxury Transport",
      desc: "Stylish wedding cars and guest transport with comfort and class.",
    },
    {
      icon: <FaPalette className="text-pink-500 text-5xl mb-4" />,
      title: "Decor & Styling",
      desc: "Stunning stage, floral decorations, and venue styling for a royal wedding vibe.",
    },
    {
      icon: <FaHotel className="text-pink-500 text-5xl mb-4" />,
      title: "Room & Accommodation",
      desc: "Luxurious rooms and suites for guests with premium hospitality and comfort.",
    },
    {
      icon: <FaGlassCheers className="text-pink-500 text-5xl mb-4" />,
      title: "Cocktail & Bar Services",
      desc: "Signature cocktails, mocktails, and a wide selection of beverages for your celebration.",
    },
    {
      icon: <FaGift className="text-pink-500 text-5xl mb-4" />,
      title: "Gifting & Invitations",
      desc: "Designer invitations, personalized gifts, and return favors for all your guests.",
    },
    {
      icon: <FaLightbulb className="text-pink-500 text-5xl mb-4" />,
      title: "Lighting & Effects",
      desc: "Dramatic lighting, fireworks, and special effects to set the perfect mood.",
    },
  ];

  return (
    <section className="relative py-20 mt-15 bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          
          className="text-4xl md:text-5xl font-extrabold text-gray-900"
        >
          Our{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
            Wedding Services
          </span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
         
          className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
        >
          From grand weddings to intimate ceremonies, we provide everything you
          need to make your big day extraordinary.
        </motion.p>

        {/* Service Cards */}
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1, // fast stagger
                duration: 0.5, // quick load
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1, rotate: 1 }}
              className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition"
            >
              {service.icon}
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
