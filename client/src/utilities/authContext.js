import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}api/auth/login`, inputs, {
        withCredentials: true,
      })
      .then((res) => {
        const cookie = res.headers["set-cookie"];
        // Save the cookie in local cookie storage
        if (cookie) {
          document.cookie = cookie;
        }
        console.log(cookie);
        setCurrentUser(res.data);
      });
  };

  const logout = async (inputs) => {
    await axios.post(`${process.env.REACT_APP_BASE_URL}api/auth/logout`, null, {
      withCredentials: true,
    });
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, setCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
