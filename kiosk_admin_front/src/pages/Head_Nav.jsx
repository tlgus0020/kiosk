import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from '../css/Nav.module.css';
import '../css/AdminTable.css';

export function Head_nav(props){
  const nav = useNavigate()
  useEffect(() => {
    if(props.admin == false){
      console.log("어드민?");
      nav("/");
    }
  },[])

  return (
    <nav className={styles.navbar}>
      <h1 className={styles.title}>본사통합관리시스템</h1>
      <div className={styles.navLinks}>
        <NavLink
          to="/head/stock"
          className={({ isActive }) => isActive ? styles.active : styles.inactive}
        >
          Stock
        </NavLink>
        <NavLink
          to="/head/pay"
          className={({ isActive }) => isActive ? styles.active : styles.inactive}
        >
          Pay
        </NavLink>
        <NavLink
          to="/head/menu"
          className={({ isActive }) => isActive ? styles.active : styles.inactive}
        >
          Menu
        </NavLink>
      </div>
    </nav>
  );
};

