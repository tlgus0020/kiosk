import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../css/Nav.module.css';

const Nav = () => {
  return (
    <nav className={styles.navbar}>
      <h1 className={styles.title}>통합품질관리시스템</h1>
      <div className={styles.navLinks}>
        <NavLink
          to="/stock"
          className={({ isActive }) => isActive ? styles.active : styles.inactive}
        >
          Stock
        </NavLink>
        <NavLink
          to="/pay"
          className={({ isActive }) => isActive ? styles.active : styles.inactive}
        >
          Pay
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
