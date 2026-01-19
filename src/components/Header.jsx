import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const toggleSidebar = () => {
        document.body.classList.toggle('toggle-sidebar');
    };
    useEffect(() => {
        const selectHeader = document.querySelector('#header');
        const headerScrolled = () => {
            if (window.scrollY > 100) {
                selectHeader.classList.add('header-scrolled');
            } else {
                selectHeader.classList.remove('header-scrolled');
            }
        };

        window.addEventListener('scroll', headerScrolled);
        window.addEventListener('load', headerScrolled);

        return () => {
            window.removeEventListener('scroll', headerScrolled);
            window.removeEventListener('load', headerScrolled);
        };
    }, []);
    // const logOut=()=>{

    // }
    return (
        <header id="header" className="header fixed-top d-flex align-items-center">

            <div className="d-flex align-items-center justify-content-between">
                <Link to="/" className="logo d-flex align-items-center">
                    <img src="/img/logo.png" alt="" />
                    <span className="d-none d-lg-block" style={{color:"green", textDecoration:"none"}}>Store Track</span>
                </Link>
                <i className="bi bi-list toggle-sidebar-btn" onClick={toggleSidebar}></i>
            </div>


            <nav className="header-nav ms-auto">
                <ul className="d-flex align-items-center">
                    <li className="nav-item d-block d-lg-none">
                        <a className="nav-link nav-icon search-bar-toggle " href="#">
                            <i className="bi bi-search" />
                        </a>
                    </li>
               
                </ul>
            </nav>

        </header>
    );
}

export default Header;
