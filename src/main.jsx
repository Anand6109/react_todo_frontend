// main.jsx
import React, { createContext, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/app.scss';

export const server = "https://nodejs-todo-vdzh.onrender.com/api/v1";

export const Context = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  loading: false,
  setLoading: () => {},
  user: {},
  setUser: () => {},
});

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Adjusted initial state to true
  const [user, setUser] = useState({});

  return (
    <Context.Provider value={{
      isAuthenticated, setIsAuthenticated, loading, setLoading, user, setUser
    }}>
      <App />
    </Context.Provider>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
