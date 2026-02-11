import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import { Sidebar } from '../components/Sidebar';
// import { Header } from '../components/Header';
// import Footer from '../components/Footer';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

export const Product = () => {

  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [proName, setProName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [minQty, setMinQty] = useState("");

  const [editId, setEditId] = useState(null);

  // const [formData, setFormData] = useState({});

  useEffect(() => {

    const getProducts = async () => {
      const respro = await axios.get("http://localhost:8080/api/v1/storetrack/product");
      const proData = respro.data
      setProduct(proData);
      setIsLoading(false)
      // console.log(proData)
    }

    getProducts();
  }, [])
  if (isLoading) {
    return <p>Loading...</p>
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop page reload

    const data = {
      name: proName,
      quantity: quantity,
      price: price,
      minQuantity: minQty
    };

    try {

      if (editId) {
        // Update product(PUT)
      await axios.put(
          `http://localhost:8080/api/v1/storetrack/product/${editId}`,
          data
        );
        alert("Product updated successfully");


      } else {
        //create/add(POST)
        await axios.post("http://localhost:8080/api/v1/storetrack/product", data)
     
        alert("Product added successfully");

      }

      // reload products after save(refresh table)
      const res = await axios.get("http://localhost:8080/api/v1/storetrack/product")
      setProduct(res.data)

      // clear form
      setProName("");
      setQuantity("");
      setPrice("");
      setMinQty("");
      setEditId(null);

      // auto close modal
      document.getElementById("closeModalBtn").click();
      // const modalEl = document.getElementById("basicModal");
      // const modal = window.bootstrap.Modal.getInstance(modalEl)
      // modal.hide();


    } catch (error) {
      console.error("Error saving product", error)
      // console.error("Error saving product", error.message)
    }

  }

  //Edit product fn
  const handleEdit = (prod) => {
    setEditId(prod.id); // mark as edit mode
    setProName(prod.name);
    setQuantity(prod.quantity);
    setPrice(prod.price);
    setMinQty(prod.minQuantity);

    // modal.show();
    const modalEl = document.getElementById("basicModal");
    const modal = new window.bootstrap.Modal(modalEl);
    modal.show();
    
  };

  // DELETE FUNCTION
  //   async function handleDelete(id){
  //   //delete from backend
  //   await axios.delete("http://localhost:8080/api/v1/storetrack/product/"+id)
  //   // uppdate UI by removing the delete row 
  //   setProduct((prevPro)=> prevPro.filter(pro=> pro.id !== id))

  // } 
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:8080/api/v1/storetrack/product/${id}`);

      // Refresh table after delete
      const res = await axios.get("http://localhost:8080/api/v1/storetrack/product");
      setProduct(res.data);

    } catch (error) {
      console.error("Error deleting product", error);
    }
  };


  
  const renderStockBadge = (quantity, minQty) => {
    if (quantity === 0) {
      return <span className="badge bg-danger">OUT OF STOCK</span>;
    }

    if (quantity <= minQty) {
      return <span className="badge bg-warning text-dark">LOW STOCK</span>;
    }

    return <span className="badge bg-success">AVAILABLE</span>;
  };

  return (
    <>
       {/* <Header/>
        <Sidebar/>
        <main id="main" className="main"> */}

      <div className="pagetitle">
        <h1>Product Section</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
            <li className="breadcrumb-item active">Product</li>
          </ol>
        </nav>
      </div>

      {/* <button type="button" className="btn btn-primary mb-3" data-bs-toggle="modal"> */}
      <button type="button" className="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#basicModal">
        Add New Product
      </button >
      <div className="modal fade" id="basicModal" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              {/* <h5 className="modal-title">New Product Details</h5> */}
              <h5 className="modal-title">
                {editId ? "Edit Product" : "New Product"}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" id="closeModalBtn" aria-label="Close" />
            </div>

            <div className="modal-body">
              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-12">
                  <div className="form-floating">
                    <input type="text" onChange={(e) => setProName(e.target.value)} value={proName} className="form-control" id="floatingName" placeholder="Your Name" />
                    <label htmlFor="floatingName">Product Name</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input type="number" onChange={(e) => setQuantity(e.target.value)} value={quantity} className="form-control" id="floatingNumber" placeholder="Quantity" />
                    <label htmlFor="floatingNumber">Quantity</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input type="number" onChange={(e) => setPrice(e.target.value)} value={price} className="form-control" id="floatingPrice" placeholder="Price" />
                    <label htmlFor="floatingPrice">Price</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating">
                    <input type="number" onChange={(e) => setMinQty(e.target.value)} value={minQty} className="form-control" id="floatingQuantity" placeholder="MinQuantiy" />
                    <label htmlFor="floatingQuantity">Minimum Quantity</label>
                  </div>
                </div>
                <div className="text-center">
                  {/* <button type="submit" className="btn btn-primary me-3">Submit</button> */}
                  <button type="submit" className="btn btn-primary me-3">
                    {editId ? "Update" : "Submit"}
                  </button>
                  {/* <button type="reset" className="btn btn-secondary">Reset</button> */}
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
                <h5 className="card-title">Product Table</h5>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">S/N</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Price</th>
                      <th scope="col">Minimum Qty</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.map(((prod, index) => (
                      <tr key={prod.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{prod.name}</td>
                        <td>{prod.quantity}</td>
                        <td>{prod.price}</td>
                        <td style={{textAlign:"center",paddingRight:"52px"}}>
                          {prod.minQuantity}
                        </td>
                        <td>
                          {renderStockBadge(prod.quantity, prod.minQuantity)}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary me-2"
                            onClick={() => handleEdit(prod)}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>

                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(prod.id)}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>

                        {/* <td>
                          <i
                            className="fa-solid fa-pen-to-square text-primary me-3"
                            style={{ cursor: "pointer" }}
                            title="Edit"
                            onClick={() => handleEdit(prod)}
                          />

                          <i
                            className="fa-solid fa-trash text-danger"
                            style={{ cursor: "pointer" }}
                            title="Delete"
                            onClick={() => handleDelete(prod.id)}
                          />
                        </td> */}

                      </tr>
                    )))}

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
