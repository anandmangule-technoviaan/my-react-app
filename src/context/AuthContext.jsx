import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const ROLE_REDIRECTS = {
  'Super Admin': '/dashboard/super-admin',
  'Admin': '/dashboard/admin',
  'Warehouse Manager': '/dashboard/warehouse',
  'Store Manager': '/dashboard/store',
  'Cashier': '/dashboard/pos',
  'Employee': '/dashboard/profile'
};

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('safai_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (role, email, token) => {
    const sessionUser = {
      role,
      email,
      name: role + ' User',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAY_AItsUB35DZKTZr184pdjjzqVgMOMPIXkVfwlS4nksUHx1qqgf8sr28Hoz0YN4rRCz_IDfjffDuwhYKQfuHRlecXqHA0yQh3JcdCQKDtfGMJh60NE4yC-sSni79mJU1AtnQebdE10zN1ItQiXFWIFmTgh1jjbvy8ObDqkvKEbP362PDXnXwEocBhiocnAwxIOpkZsrJb0QPtK2wrtB7eaiU8_LBjGB5hapACzL5tbm-ZqbT_oY5F8njqQGsuAQa-RnddKKtzXzU'
    };
    
    setUser(sessionUser);
    localStorage.setItem('safai_token', token);
    localStorage.setItem('safai_user', JSON.stringify(sessionUser));

    // Redirect user to their custom dashboard
    const targetPath = ROLE_REDIRECTS[role] || '/dashboard/profile';
    navigate(targetPath, { replace: true });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('safai_token');
    localStorage.removeItem('safai_user');
    navigate('/login', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
