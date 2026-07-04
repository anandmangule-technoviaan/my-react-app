import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userProfile, setUserProfile] = useState({
    name: 'Rahul Sharma',
    phone: '9876543210',
    email: 'rahul.sharma@safaibazaar.com',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAY_AItsUB35DZKTZr184pdjjzqVgMOMPIXkVfwlS4nksUHx1qqgf8sr28Hoz0YN4rRCz_IDfjffDuwhYKQfuHRlecXqHA0yQh3JcdCQKDtfGMJh60NE4yC-sSni79mJU1AtnQebdE10zN1ItQiXFWIFmTgh1jjbvy8ObDqkvKEbP362PDXnXwEocBhiocnAwxIOpkZsrJb0QPtK2wrtB7eaiU8_LBjGB5hapACzL5tbm-ZqbT_oY5F8njqQGsuAQa-RnddKKtzXzU'
  });

  const updateProfile = (newData) => {
    setUserProfile(prev => ({ ...prev, ...newData }));
  };

  return (
    <UserContext.Provider value={{ userProfile, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
