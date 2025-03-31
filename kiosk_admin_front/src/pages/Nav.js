import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav>
        <h1>통합품질관리시스템</h1>
            <Link to="/stock">Stock</Link> |{" "}
            <Link to="/pay">Pay</Link> |{" "}
            <Link to="/menu">Menu</Link>
        </nav>
    );
};
export default Nav;