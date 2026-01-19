import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const DailySales = () => {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);

  // Separate states for each input
  const [productId, setProductId] = useState("");
  const [quantitySold, setQuantitySold] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [salesDate, setSalesDate] = useState("");

  // Fetch products
  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:8080/api/v1/storetrack/product");
    setProducts(res.data);
  };


  // Fetch daily sales
  const fetchSales = async () => {
    const res = await axios.get("http://localhost:8080/api/v1/storetrack/dailysales");
    setSales(res.data);
  };

  useEffect(() => {
    fetchProducts();
    fetchSales();
  }, []);

  //Daily Sales which affect product DECREASE in Stock History table
  // Submit sale 
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:8080/api/v1/storetrack/dailysales", {
      product_id: Number(productId),
      quantitySold: Number(quantitySold),
      selling_price: Number(sellingPrice) ,
      salesDate: salesDate 
    });

    // alert("Sale recorded successfully");

    // Refresh sales table
    fetchSales();

    // Reset form
    setProductId("");
    setQuantitySold("");
    setSellingPrice("");
    setSalesDate("");

 // auto close modal
      document.getElementById("closeModalBtn").click();
      // const modalEl = document.getElementById("basicModal");
      // const modal = window.bootstrap.Modal.getInstance(modalEl)
      // modal.hide();
  };

  const getProductName=(id)=>{
    const product = products.find((p)=> p.id === id)
    return product ? product.name : "UnKnown"
  }
  return (
    <>
      <div className="pagetitle">
        <h1>Daily Sales</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
            <li className="breadcrumb-item active">Daily Sales</li>
          </ol>
        </nav>
      </div>

      {/* MODAL */}
      <button type="button" style={{}} className="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#basicModal">
        Add Daily Sales
      </button>

      <div className="modal fade" id="basicModal" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Basic Modal</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>

            <div className="modal-body">

              <h5 className="card-title">Floating labels Form</h5>
              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-12">
                  <div className="form-floating mb-3">
                    <select 
                      className="form-select"  
                      id="floatingSelect" 
                      aria-label="State" 
                      value={productId} 
                      onChange={(e) => setProductId(e.target.value)} 
                      required
                    >
                       <option value="">Select product</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} (Stock: {p.quantity})
                        </option>
                      ))}
                    </select>
                    <label for="floatingSelect">Product</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input value={quantitySold} onChange={(e) => setQuantitySold(e.target.value)} type="number" className="form-control" placeholder="Quantity Sold" />
                    <label htmlFor="floatingQuantitySold">Quantity Sold</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input value={salesDate} onChange={(e) => setSalesDate(e.target.value)} type="date" className="form-control" placeholder="Sales Date" />
                    <label htmlFor="floatingSaleDate">Sales Date</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} type="number" className="form-control" placeholder="Selling Price" required />
                    <label htmlFor="floatingSellingPrice">Selling Price</label>
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary me-3">Submit</button>
                  <button type="reset" className="btn btn-secondary">Reset</button>
                </div>
              </form>

            </div>
            {/* <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div> */}
          </div>
        </div>
      </div>

      <section className="section">
        <div className="row">

          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Daily Sales Table</h5>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">S/N</th>
                      {/* <th scope="col">Product Id</th> */}
                      <th scope="col">Product Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">price</th>
                      <th scope="col">Total</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sales.map((sale, index) => (
                      <tr key={sale.id}>
                        <th scope="row">{index + 1}</th>
                        {/* <td>{sale.product_id}</td> */}
                        <td>{getProductName(sale.product_id)}</td>
                        <td>{sale.quantitySold}</td>
                        <td>{sale.selling_price}</td>
                        <td>{sale.totalSale}</td>
                        <td>{sale.salesDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
