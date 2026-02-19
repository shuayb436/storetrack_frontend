import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import { Header } from '../components/Header';
// import { Sidebar } from '../components/Sidebar';
// import Footer from '../components/Footer';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

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
    // fetchSales();
    //OR
    // reload products after save(refresh table)
    const res = await axios.get("http://localhost:8080/api/v1/storetrack/dailysales")
    setSales(res.data)

    // Reset form
    setProductId("");
    setQuantitySold("");
    setSellingPrice("");
    setSalesDate("");

 // auto close modal
      document.getElementById("closeModalBtn").click();
      //  const modalEl = document.getElementById("basicModal");
      // const modal = window.bootstrap.Modal.getInstance(modalEl)
      // modal.hide();

  };

  const handleProductChange=(e)=>{
    const selectedId = e.target.value
    setProductId(selectedId)
    // find selected product
    const selectedProduct=products.find((p)=>p.id==Number(selectedId))
    // autoset price
     if (selectedProduct) {
      setSellingPrice(selectedProduct.price);
    } else {
      setSellingPrice("");
    }
  }
  const getProductName=(id)=>{
    const product = products.find((p)=> p.id === id)
    return product ? product.name : "UnKnown"
  }
  return (
    <>
    {/* <Header/>
    <Sidebar/>
    <main id="main" className="main"> */}


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
      <button type="button" className="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#basicModal">
        Add Daily Sales
      </button>

      <div className="modal fade" id="basicModal" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Basic Modal</h5>

              <button type="button" className="btn-close" data-bs-dismiss="modal" id="closeModalBtn" aria-label="Close" />
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
                      onChange={handleProductChange} 
                      required
                    >
                      {/* {products
                        .filter(p => p.quantity > 0)
                        .map(p => (
                          <option key={p.id} value={p.id}>
                            {p.name} (Stock: {p.quantity})
                          </option>
                      ))} */}
                      {products.map(p => (
                        <option key={p.id} value={p.id} disabled={p.quantity === 0}>
                          {p.name} {p.quantity === 0 ? "(Out of Stock)" : `(Stock: ${p.quantity})`}
                        </option>
                      ))}

                    </select>
                    <label for="floatingSelect">Product</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input value={quantitySold} onChange={(e) => setQuantitySold(e.target.value)} type="number" className="form-control" placeholder="Quantity Sold" required />
                    <label htmlFor="floatingQuantitySold">Quantity Sold</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input value={salesDate} onChange={(e) => setSalesDate(e.target.value)} type="date" className="form-control" placeholder="Sales Date" required />
                    <label htmlFor="floatingSaleDate">Sales Date</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    {/* <input value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} type="number" className="form-control" placeholder="Selling Price" required /> */}
                    <input value={sellingPrice} type="number" className="form-control" placeholder="Selling Price" readOnly />
                    <label htmlFor="floatingSellingPrice">Selling Price</label>
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary me-3">Submit</button>
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="closeModalBtn">Close</button>
                </div>
              </form>

            </div>
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
                        {/* <td>{sale.totalSale}</td> */}
                        <td>{sale.totalSale.toLocaleString()}</td>
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
    {/* </main>
    <Footer/> */}
    </>
  )
}
