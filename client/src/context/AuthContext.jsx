import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext();

const getStoredUser = () => {
  try {
    return JSON.parse(sessionStorage.getItem("EventUser")) || "";
  } catch {
    sessionStorage.removeItem("EventUser");
    return "";
  }
};

export const AuthProvider = (props) => {
  const [user, setUser] = useState(getStoredUser);
  const [isLogin, setIsLogin] = useState(() => Boolean(getStoredUser()));
  const [isAdmin, setIsAdmin] = useState(
    () => getStoredUser()?.role === "Admin",
  );

  useEffect(() => {
    setIsLogin(!!user);
    setIsAdmin(user?.role === "Admin");
  }, [user]);

  const value = {
    user,
    isLogin,
    isAdmin,
    setUser,
    setIsLogin,
    setIsAdmin,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
