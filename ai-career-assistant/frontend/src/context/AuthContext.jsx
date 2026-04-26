import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is logged in on mount
    const checkLoggedIn = async () => {
      try {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
          const parsedData = JSON.parse(userInfo);
          setUser(parsedData);
          // Optional: Verify token with backend
          // await api.get('/users/profile');
        }
      } catch (err) {
        console.error('Auth verification failed', err);
        localStorage.removeItem('userInfo');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  const login = React.useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/users/login', { email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      const errMsg = err.response?.data?.message || err.message;
      setError(errMsg);
      throw new Error(errMsg);
    }
  }, []);

  const register = React.useCallback(async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/users/register', { name, email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      const errMsg = err.response?.data?.message || err.message;
      setError(errMsg);
      throw new Error(errMsg);
    }
  }, []);

  const logout = React.useCallback(() => {
    localStorage.removeItem('userInfo');
    setUser(null);
  }, []);

  const value = React.useMemo(() => ({
    user,
    loading,
    error,
    login,
    register,
    logout
  }), [user, loading, error, login, register, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
