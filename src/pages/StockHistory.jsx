// import React, { useEffect, useState } from "react";
// import axios from "axios";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { Sidebar } from "../components/Sidebar";
// import { Header } from "../components/Header";
// import Footer from "../components/Footer";

export const StockHistory = () => {
  const [stockHistory, setStockHistory] = useState([]);

  const [productId, setProductId] = useState("");
  const [changeType, setChangeType] = useState("");
  const [changeQty, setChangeQty] = useState("");
  const [changeDate, setChangeDate] = useState("");
  // const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchStockHistory();
    fetchProducts();
  }, []);

  // Fetch products
  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:8080/api/v1/storetrack/product");
    setProducts(res.data);
  };
  //fetch stock Histories
  const fetchStockHistory = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/storetrack/stockhistory");
      setStockHistory(response.data);

    } catch (error) {
      console.error("Error fetching stock history", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      product_id: productId,
      change_type: changeType,
      change_quantity: changeQty,
      change_date: changeDate
      // change_type:changeType,
    }
    await axios.post("http://localhost:8080/api/v1/storetrack/dailysales", data);

    // alert("Sale recorded successfully");

    // Refresh stock History table
    fetchStockHistory();

    // Reset form
    setProductId("");
    setChangeType("");
    setChangeQty("");
    setChangeDate("");

    // auto close modal
    document.getElementById("closeModalBtn").click();

  };

  const getProductName = (id) => {
    const product = products.find((p) => p.id === id)
    return product ? product.name : "UnKnown"
  }
  return (
    <>
      {/* <Header/>
      <Sidebar/>
      <main id="main" className="main"> */}

      <div className="pagetitle">
        <h1>Stock History</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
            <li className="breadcrumb-item active">Stock History</li>
          </ol>
        </nav>
      </div>

      <section className="section">
        <div className="row">

          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">📦 Stock History</h5>

                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">S/N</th>
                      {/* <th scope="col">Product Id</th> */}
                      <th scope="col">Product Name</th>
                      <th scope="col">Change Type</th>
                      <th scope="col">Change Qty</th>
                      <th scope="col">Change Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stockHistory.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{getProductName(item.product_id)}</td>
                        <td>
                          <span
                            className={`badge ${item.change_type === "INCREASE"
                              ? "bg-success"
                              : "bg-danger"
                              }`}
                          >
                            {item.change_type}
                          </span>
                        </td>
                        <td>{item.change_quantity}</td>
                        <td>{item.change_date}</td>
                      </tr>
                    ))
                    }
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* </main>
      <Footer/> */}
    </>
  );
};

