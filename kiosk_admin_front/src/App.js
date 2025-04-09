import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Stock from './pages/Stock';
import Pay from './pages/Pay';
import Nav from './pages/Nav';
import PayDetail from './pages/PayDetail';
import './App.css';
import { Head_Center } from './pages/Head_Center';
import { Head_nav } from './pages/Head_Nav';
import { Head_menu } from './pages/Head_menu';

function App(props) {
    return (
        <>
            {props.admin ? <Head_nav admin={props.admin} /> : <Nav />}
            <Routes>
                <Route path="/stock" element={<Stock />} />
                <Route path="/pay" element={<Pay />} />
                <Route path="/pay/:id" element={<PayDetail />} />
                {props.admin && <Route path="/head/stock" element={<Head_Center />} />}
                {props.admin && <Route path="/head/pay" element={<Pay />} />}
                {props.admin && <Route path="/head/menu" element={<Head_menu />} />}
            </Routes>
        </>
    );
}

export default App;
