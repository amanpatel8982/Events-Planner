import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import {Toaster} from "react-hot-toast";
import UserDashboard from "./pages/userDashboard";
import Profile  from "./pages/Profile";
import Setting  from "./pages/Setting";


const App = () => {
  return (
    <>
      <BrowserRouter>
      <Toaster/>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/userDashboard" element={<UserDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/setting" element={<Setting />} />

        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;