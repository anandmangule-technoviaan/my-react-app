import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Stock level of HMX Glass Cleaner 5L is critical at Store SB-IND-001', type: 'warning', read: false },
    { id: 2, text: 'Restock Order ORD-2026-1054 pending approval from Admin', type: 'info', read: false }
  ]);

  const addNotification = (text, type = 'info') => {
    setNotifications(prev => [
      { id: Date.now(), text, type, read: false },
      ...prev
    ]);
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAllAsRead, clearNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
