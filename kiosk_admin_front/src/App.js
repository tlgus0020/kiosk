import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Stock from './pages/Stock';
import Pay from './pages/Pay';
import Nav from './pages/Nav';
import PayDetail from './pages/PayDetail';
import './App.css';
import { Head_Center } from './pages/Head_Center';
import { Head_nav } from './pages/Head_Nav';


function App(props) {
    return (
        <Router>
            {props.admin? <Head_nav admin={props.admin}></Head_nav>  : <Nav></Nav>}
            <Routes>
                <Route path="/stock" element={<Stock />} />
                <Route path="/pay" element={<Pay />} />
                
                <Route path="/pay/:id" element={<PayDetail />} />
                {props.admin? <Route path="/head/stock" element={<Head_Center></Head_Center>}></Route> : null}
            </Routes>
        </Router>
    );
}

export default App;
