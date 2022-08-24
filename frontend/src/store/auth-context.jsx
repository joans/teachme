import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  auth: {},
  onLogout: () => {},
  onLogin: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [auth, setAuth] = useState({});

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "1") {
      setIsLoggedIn(true);
      setAuth(JSON.parse(localStorage.getItem("userObj")));
    }
  }, []);

  const loginFunction = (auth) => {
    // check email and password for validity on backend!
    setAuth(auth);
    localStorage.setItem("isLoggedIn", "1");
    localStorage.setItem("userObj", JSON.stringify(auth));
    setIsLoggedIn(true);
  };

  const logoutFunction = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userObj");
    setIsLoggedIn(false);
    setAuth({});
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        auth: auth,
        onLogout: logoutFunction,
        onLogin: loginFunction,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
