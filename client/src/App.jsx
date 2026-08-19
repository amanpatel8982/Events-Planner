import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminPanel from "./pages/AdminPanel";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Service from "./pages/Service";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";

const AppRoutes = () => {
  const { pathname } = useLocation();
  const isWorkspace = pathname === "/dashboard" || pathname === "/adminpanel";
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const hideSiteChrome = isWorkspace || isAuthPage;

  return (
    <div className="min-h-screen">
      <ScrollToTop />
      {!hideSiteChrome && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<CustomerDashboard />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideSiteChrome && <Footer />}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            border: "1px solid #e2e6e3",
            borderRadius: "8px",
            color: "#18201c",
            boxShadow: "0 14px 40px rgba(24, 32, 28, 0.12)",
          },
        }}
      />
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
