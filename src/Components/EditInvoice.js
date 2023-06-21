import React from 'react';
import { useState,useEffect } from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import { getInvoiceDetail, updateIvoive } from "./service/auth.service";
import { toast } from 'react-toastify';

const EditInvoice = () => {
  let today = new Date().toISOString().slice(0, 10);
  const [array, setArray] = useState([]);
  const [status, setStatus] = useState("");
  
  const [grandtotal, setGrandtotal] = useState()
  console.log(status)

  let { id } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState({});

  useEffect(() => {
      const test = async (id) => {
          const response = await getInvoiceDetail(id);
          setInput(response.data.result)
         setFormFields(response.data.result.item)
          console.log(response.data.result)
      }
      test(id);
  }, [])
  const [loading, setLoading] = useState(false);
  const [formFields, setFormFields] = useState([
    { productname: '', price: '', quantity: '', tax: '', total: '' },
  ])

  const handleFormChange = (event, index) => {
    let data = [...formFields];

    data[index][event.target.name] = event.target.value;
    setFormFields(data);

    let calc = (data[index].price * data[index].quantity)
    data[index].total = (calc * 0.01 * data[index].tax) + calc
    console.log(calc)

    const flattenObj = data.reduce((acc, curVal) => {
      return acc + parseFloat(curVal?.total)
    }, 0);
    console.log("flattenObj", flattenObj)
    setGrandtotal(flattenObj);
  }

  const submit = async (e) => {
    e.preventDefault();
    try{
       
    console.log("Run update code here");
    const updateResponse = await updateIvoive(input._id,input.customername,
      status,
      formFields,
      grandtotal);
    if(updateResponse.data.status){
      setLoading(true);
      toast.success('Invoice Updated',
      {position: toast.POSITION.TOP_RIGHT},
      {autoClose:1000},
      )
      setTimeout(() => {
        navigate("/Invoice");
      }, 1000);
    }else{
      toast.success('Updation Failed',
      {position: toast.POSITION.TOP_RIGHT},
      {autoClose:1000},
      )
    }
    console.log(updateResponse.data);
    }
    catch(e)
    {console.warn(e);}
   
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
  console.log(grandtotal)

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
              <select    class="form-control" value={input.customername} >
                  <option value=" Select a Customer ">
                   {input.customername}
                  </option>
                  {array.map((data) => (
                    <option value={data._id}>
                      {input.customername}
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
                    value={input.email}
                   
                  />
                </div>
              </div>
              <br />
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
                    </div>
                    
                    <div className='text-right'>
                      <button className="btn btn-primary" onClick={addFields}>Add Invoice</button>
                    </div> 
                    <table className="table table-striped">
                      <thead>
                        <tr>
                 
                          <th>Product Name</th>
                          <th className="center">Qty</th>
                          <th className="right">Price</th>
                          <th className="right">Tax(%)</th>
                          <th className="right">Total</th>
                          <th className="right">X</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formFields.map((form, index) => { 
                        return (
                            <tr>
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
                                  onChange={event => handleFormChange(event, index)}
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
                  <button className="btn btn-md btn-primary" onClick={submit}>
            {loading ? (
              <div class="spinner-border spinner-border-sm" role="status"></div>
            ) : (
              "Update Invoice"
            )}
          </button>
            </div>
          </div>
        </form>
        
      </div>
    </>
  )
}
export default EditInvoice;