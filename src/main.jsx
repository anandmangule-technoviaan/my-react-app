import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import App from './App';
import '@/styles/index.css';

import { ThemeProvider } from '@/context/ThemeContext';
import { NotificationProvider } from '@/context/NotificationContext';
import { AuthProvider } from '@/context/AuthContext';
import { UserProvider } from '@/context/UserContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <NotificationProvider>
        <BrowserRouter>
          <AuthProvider>
            <UserProvider>
              <App />
              <Toaster
                position="top-center"
                toastOptions={{
                  duration: 3000,
                  style: {
                    borderRadius: '12px',
                    padding: '12px 16px',
                    background: '#00433d',
                    color: '#ffffff',
                    fontWeight: 500,
                  },
                }}
              />
            </UserProvider>
          </AuthProvider>
        </BrowserRouter>
      </NotificationProvider>
    </ThemeProvider>
  </React.StrictMode>
);
