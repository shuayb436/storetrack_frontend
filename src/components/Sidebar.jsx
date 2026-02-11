// import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {

  return (
    <aside id="sidebar" className="sidebar">

        <ul className="sidebar-nav" id="sidebar-nav">

        <li className="nav-item">
          <Link className="nav-link collapsed" to="/">
            <i className='bx bxs-dashboard' style={{color:"green",marginRight:"3px",fontSize:"18px"}}></i>
            <span style={{color:"black",fontSize:"15px"}}>Dashboard</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="products" className="nav-link collapsed">
            <i className="fa-solid fa-bag-shopping" style={{color:"green",marginRight:"3px",fontSize:"18px"}}></i>
            {/* <i class="fa-solid fa-box" style={{marginRight:"3px",fontSize:"18px"}}></i> */}

            <span style={{color:"black",fontSize:"15px"}}>Products</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link collapsed" to="sales">
            <i className="fa-solid fa-calendar-day" style={{color:"green",marginRight:"3px",fontSize:"18px"}}></i>
            <span style={{color:"black",fontSize:"15px"}}>Daily Sales</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link collapsed" to="history">
            <i className="fa-solid fa-warehouse" style={{color:"green",marginRight:"3px",fontSize:"16px"}}></i>
            <span style={{color:"black",fontSize:"15px"}}>Stock Histories</span>
          </Link>
        </li>

      </ul>

    </aside>
  );
}

export default Sidebar;