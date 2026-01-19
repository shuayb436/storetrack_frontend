import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const Dashboard = () => {

  const [productTotal, setProductTotal] = useState(0);
  const [salesTotal, setSalesTotal] = useState(0);
  const [stockHisTotal, setStockHisTotal] = useState([]);


  useEffect(() => {
    const getProducts = async () => {
      const respro = await axios.get("http://localhost:8080/api/v1/storetrack/product");
      const proData = respro.data;

      setProductTotal(proData.length); // store total count
    };

    const fetchStockHistory = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/storetrack/stockhistory");
        const stockData = response.data
        setStockHisTotal(stockData.length);
      } catch (error) {
        console.error("Error fetching stock history", error);
      }
    };
    fetchStockHistory()
    getProducts();
  }, []);

  useEffect(() => {
    const getSales = async () => {
      const respro = await axios.get("http://localhost:8080/api/v1/storetrack/dailysales");
      const proData = respro.data;

      setSalesTotal(proData.length); // store total count
    };

    getSales();
  }, []);


  return (
    <>
      <div>
        <div className="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              {/* <li className="breadcrumb-item"><Link to="/">Home</Link></li> */}
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>
        <section className="section dashboard">
          <div className="row">
            {/* Left side columns */}
            <div className="col-lg-12">
              <div className="row">
                {/* Sales Card */}
                <div className="col-xxl-4 col-md-4 col-sm-6">
                  <div className="card info-card sales-card">
                    <div className="filter">
                      <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>
                        <li><a className="dropdown-item" href="#">Today</a></li>
                        <li><a className="dropdown-item" href="#">This Month</a></li>
                        <li><a className="dropdown-item" href="#">This Year</a></li>
                      </ul>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">Total Product <span>| Today</span></h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="fa-solid fa-bag-shopping" style={{ color: "green", fontSize: "38px" }}></i>
                        </div>
                        <div className="ps-3">
                          {/* <h6>145</h6> */}
                          <h6>{productTotal}</h6>
                          {/* <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{/* End Sales Card */}
                {/* Revenue Card */}
                <div className="col-xxl-4 col-md-4 col-sm-6">
                  <div className="card info-card revenue-card">
                    <div className="filter">
                      <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>
                        <li><a className="dropdown-item" href="#">Today</a></li>
                        <li><a className="dropdown-item" href="#">This Month</a></li>
                        <li><a className="dropdown-item" href="#">This Year</a></li>
                      </ul>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title"> Sales <span>| Today</span></h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          {/* <i className="bi bi-currency-dollar" /> */}

                          <i className="fa-solid fa-cart-shopping" style={{ color: "green" }} />

                        </div>
                        <div className="ps-3">
                          {/* <h6>$3,264</h6> */}
                          <h6>{salesTotal}</h6>
                          {/* <span className="text-success small pt-1 fw-bold">8%</span> <span className="text-muted small pt-2 ps-1">increase</span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-4 col-md-4 col-sm-6">
                  <div className="card info-card revenue-card">
                    <div className="filter">
                      <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>
                        <li><a className="dropdown-item" href="#">Today</a></li>
                        <li><a className="dropdown-item" href="#">This Month</a></li>
                        <li><a className="dropdown-item" href="#">This Year</a></li>
                      </ul>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">Stock History <span>| This Month</span></h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          {/* <i className="bi bi-currency-dollar" /> */}
                          <i className="fa-solid fa-warehouse" style={{ color: "green", fontSize: "32px" }}></i>

                        </div>
                        <div className="ps-3">
                          {/* <h6>$3,264</h6> */}
                          <h6>{stockHisTotal}</h6>
                          {/* <span className="text-success small pt-1 fw-bold">8%</span> <span className="text-muted small pt-2 ps-1">increase</span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{/* End Revenue Card */}
              </div>
            </div>{/* End Left side columns */}
          </div>
        </section>
      </div>

    </>
  )
}
