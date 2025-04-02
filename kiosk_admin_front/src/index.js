import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './Login';


function Root() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(()=>{
    console.log(isAdmin);
  },[isAdmin])

  return isLoggedIn ? (
    <App admin={isAdmin}/>
  ) : (
    <Login onLoginSuccess={() => setIsLoggedIn(true)} checkAdmin={() => setIsAdmin(true)} />
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

reportWebVitals();
