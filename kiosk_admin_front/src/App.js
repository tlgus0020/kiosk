import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Stock from './pages/Stock';
import Pay from './pages/Pay';
import Menu from './pages/Menu';

function App() {
    return (
        <Router>
            <nav>
                <h1>통합품질관리시스템</h1>
                <Link to="/stock">Stock</Link> |{" "}
                <Link to="/pay">Pay</Link> |{" "}
                <Link to="/menu">Menu</Link>
            </nav>

            <Routes>
                <Route path="/stock" element={<Stock />} />
                <Route path="/pay" element={<Pay />} />
                <Route path="/menu" element={<Menu />} />
            </Routes>
        </Router>
    );
}

export default App;
