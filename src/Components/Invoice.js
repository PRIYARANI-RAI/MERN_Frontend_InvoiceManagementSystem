import { useState, useEffect } from "react";
import { addInvoiceToBack, getCustomerById, showlist, showlistinvoice } from "./service/auth.service";
import { Link } from "react-router-dom";
const Invoice = () => {
  let today = new Date().toISOString().slice(0, 10);
  const [array, setArray] = useState([]);
  const [customer, setCustomer] = useState({});
  const [status, setStatus] = useState("");
  const [grandtotal, setGrandtotal] = useState()
  console.log(status)

  const [formFields, setFormFields] = useState([
    { productname: '', price: '', quantity: '', tax: '', total: '' },
  ])

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
    let calc = (data[index].price * data[index].quantity)
    data[index].total = (calc * 0.01 * data[index].tax) + calc
    console.log(calc);
    const flattenObj = data.reduce((acc, curVal) => {
      return acc + parseFloat(curVal?.total)
    }, 0);
    console.log("flattenObj", flattenObj)
    setGrandtotal(flattenObj);
  }
  const invoiceData = async(e) => {
    console.log(formFields)
    const senddata = await addInvoiceToBack(customer._id, customer.name, customer.email, status, formFields, grandtotal)
  }
  const submit = (e) => {
    e.preventDefault();
  }

  const addFields = () => {
    let object = { productname: '', price: '', quantity: '', tax: '', total: '' }

    setFormFields([...formFields, object])
  }

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1)
    setFormFields(data)
  }
  useEffect(() => {
    const test = async (e) => {
      const response = await showlist();
      setArray(response.data.result);
    };
    test();
  }, []);
  const dropdownHandler = async (e) => {
    const res = await getCustomerById(e.target.value);
    setCustomer(res.data.result);
  };
  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <div className="container mt-3" style={{ 'marginLeft': '10%' }} >
        <form onSubmit={submit}>
          <div className="form-group">
            <div className="row">
              <div className="col-md-4">
                <label>Date</label>
              </div>
              <div className="col-md-4">
                <strong>{today}</strong>
              </div>
            </div>

          </div>
          <div class="form-group">
            <div className="row">
              <div className="col-md-4">
                <label>Customer Name :</label>
              </div>
              <div className="col-md-4">
                <select class="form-control" onChange={dropdownHandler}>
                  <option value="⬇️ Select a Customer ⬇️">
                    {" "}
                    -- Select a Customer --{" "}
                  </option>
                  {array.map((data) => (
                    <option value={data._id}>
                      {data.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <br />

            <div class="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label>Email :</label>
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Email"
                    value={customer.email}
                  />
                </div>
              </div>
              <br />

              <div class="form-group">
                <div className="row">
                  <div className="col-md-4">
                    <label>phone :</label>
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Email"
                      value={customer.phone}
                    />
                  </div>
                </div>


                <div class="form-group">
                  <div className="row">
                    <div className="col-md-4">
                      <label>Status</label>
                    </div>
                    <div className="col-md-4"> <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="status"
                        value="Paid"
                        onChange={(e) => setStatus(e.target.value)}
                      />
                      <label
                        class="form-check-label"
                        for="flexRadioDefault1"
                      >
                        Paid
                      </label>
                      <br />
                      <input
                        class="form-check-input"
                        type="radio"
                        name="status"
                        value="Unpaid"
                        onChange={(e) => setStatus(e.target.value)}
                      />
                      <label
                        class="form-check-label"
                        for="flexRadioDefault2"
                      >
                        Unpaid
                      </label>
                    </div>
                    </div>
                    <div className='text-right'>
                      <button className="btn btn-primary" onClick={addFields}>Add Invoice</button>
                    </div>
                   
                    <table style={{ 'display': 'inline-block' }} className="table table-striped">
                      <thead>
                        <tr>
                          {/* <th className="center">#</th> */}
                          <th>Product Name</th>
                          <th className="center">Price</th>
                          <th className="right">Qty</th>
                          <th className="right">Tax(%)</th>
                          <th className="right">Total</th>
                          <th className="right">X</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formFields.map((form, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <input className="form-control" style={{ 'width': '200px' }}
                                  name='productname'
                                  placeholder='productname'
                                  onChange={event => handleFormChange(event, index)}
                                  value={form.productname}
                                />
                              </td>
                              <td >
                                <input className="form-control" style={{ 'width': '200px' }}
                                  name='price'
                                  placeholder='price'
                                  onChange={event => handleFormChange(event, index)}
                                  value={form.price}
                                />
                              </td>
                              <td >
                                <input className="form-control" style={{ 'width': '200px' }}
                                  name='quantity'
                                  placeholder='quantity'
                                  onChange={event => handleFormChange(event, index)}
                                  value={form.quantity}
                                />
                              </td>
                              <td>
                                <input className="form-control" style={{ 'width': '200px' }}
                                  name='tax'
                                  placeholder='tax'
                                  onChange={event => handleFormChange(event, index)}
                                  value={form.tax}
                                />
                              </td>
                              <td>
                                <input className="form-control" style={{ 'width': '200px' }}
                                  name='total'
                                  placeholder='total'
                                  value={form.total}
                                />
                              </td>
                              <td>
                                <button onClick={() => removeFields(index)}><i class="fa-sharp fa-solid fa-trash"></i></button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
              
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <label>Grand Total :</label>
                    </div>
                    <div className="col-md-4">
                      <input
                        type="text" name="grandtotal"
                        class="form-control"
                        value={grandtotal}
                      />
                    </div>
                  </div>
                  <Link to="/Invoice">
                  <button className="btn btn-md btn-primary" onClick={invoiceData}>Submit</button></Link>
                </div>

              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
export default Invoice;