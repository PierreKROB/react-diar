import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('token'));

  useEffect(() => {
    const token = Cookies.get('token');

  }, [isLoggedIn]);

  const login = (token) => {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = new Date();
    const exp = new Date(payload.exp * 1000);
    const expires = (exp - now) / (1000 * 60 * 60 * 24);
    Cookies.set('token', token, { expires });
    setIsLoggedIn(true);
  };

  const logout = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
