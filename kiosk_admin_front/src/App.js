import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Stock from './pages/Stock';
import Pay from './pages/Pay';
import Nav from './pages/Nav';
import PayDetail from './pages/PayDetail';
import './App.css';

function App() {
    return (
        <Router>
            <Nav></Nav>
            <Routes>
                <Route path="/stock" element={<Stock />} />
                <Route path="/pay" element={<Pay />} />
                <Route path="/pay/:id" element={<PayDetail />} />
            </Routes>
        </Router>
    );
}

export default App;
