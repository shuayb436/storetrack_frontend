import React from 'react';
import Header from '../components/Header';
// import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { Link, Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const HomeLayout = () => {
    return (
        <>
            <Header />
            <Sidebar/>
            <div id="main">
                <Outlet /> {/* hiii hubadilika badilika page kwa kila kinachotolewa */}
            </div>
            <Footer />
            <Link to="#" className="back-to-top d-flex align-items-center justify-content-center">
                <i className="bi bi-arrow-up-short"></i>
            </Link>
        </>
    );
};

export default HomeLayout;
