import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './Login';

function Root() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  const [isAdmin, setIsAdmin] = useState(true);       

  useEffect(() => {
    console.log('isAdmin:', isAdmin);
  }, [isAdmin]);

  const handleLoginSuccess = (role) => {
    setIsLoggedIn(true);
    setIsAdmin(role === 'admin');
  };

  return isLoggedIn ? (
    <App admin={isAdmin} />
  ) : (
    <Login onLoginSuccess={handleLoginSuccess} />
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

reportWebVitals();
