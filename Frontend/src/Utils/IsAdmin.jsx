import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

const AuthProvider = ({ children }) => {
  
  const [isAuth, setIsAuth] = useState(() => {
    const savedAuth = localStorage.getItem("isAuth");
    return savedAuth === "true"; 
  });

  useEffect(() => {
    localStorage.setItem("isAuth", isAuth);
  }, [isAuth]);

  return (
    <AppContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AppContext.Provider>
  );
};

export default AuthProvider;
