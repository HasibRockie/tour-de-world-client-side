import React, { createContext } from "react";
import FirebaseSettings from "./../Firebase/Firebase.settings";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const allContext = FirebaseSettings();
  return (
    <AuthContext.Provider value={allContext}>
        {children}
    </AuthContext.Provider> 
  );
};

export default AuthProvider;
