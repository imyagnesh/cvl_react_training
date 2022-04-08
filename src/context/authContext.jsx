import React, { createContext, useState, useEffect, useMemo } from 'react';
import {} from 'react/cjs/react.production.min';
import axiosInstance from '../utils/axiosInstance';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('@token');
    if (token) {
      const tokenObj = JSON.parse(token);
      setUser(tokenObj);
    }
  }, []);

  const onLogin = async (values, actions) => {
    try {
      const { rememberMe, ...rest } = values;
      const res = await axiosInstance.post('login', rest);
      sessionStorage.setItem('@token', JSON.stringify(res.data));
      setUser(res.data);
      actions.resetForm();
    } catch (error) {
      actions.setErrors({ serverError: error.message });
    }
  };

  const onRegister = async (values, actions) => {
    try {
      const { confirmPassword, photo, ...rest } = values;
      console.log(photo);
      const res = await axiosInstance.post(
        'register',
        {
          ...rest,
          createdAt: new Date(),
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      sessionStorage.setItem('@token', JSON.stringify(res.data));
      actions.resetForm();
      setUser(res.data);
    } catch (error) {
      actions.setErrors({ serverError: error.message });
    }
  };

  const onLogout = () => {
    sessionStorage.clear();
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      onLogin,
      onRegister,
      onLogout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
