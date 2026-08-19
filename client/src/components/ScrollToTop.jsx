import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const pageTitles = {
  "/": "EverAfter Events | Weddings & Celebrations",
  "/about": "About | EverAfter Events",
  "/service": "Services | EverAfter Events",
  "/gallery": "Gallery | EverAfter Events",
  "/contact": "Contact | EverAfter Events",
  "/login": "Sign In | EverAfter Events",
  "/register": "Create Account | EverAfter Events",
  "/dashboard": "Planning Dashboard | EverAfter Events",
  "/adminpanel": "Admin Workspace | EverAfter Events",
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    document.title = pageTitles[pathname] || "Page Not Found | EverAfter Events";
  }, [pathname]);

  return null;
};

export default ScrollToTop;
