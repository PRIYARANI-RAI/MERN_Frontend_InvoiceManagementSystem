import React from 'react';
import { useState,useEffect } from 'react'
import {useParams,useNavigate,Link} from 'react-router-dom'
import { getCustomerDetail} from "./service/auth.service";
import { toast } from 'react-toastify';

const ViewCustomer = ()=>{
    let { id } = useParams();
    const navigate = useNavigate();
    const [input, setInput] = useState({
        name: "",
        email: "",
        phone: ""
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((previousValue) => ({
            ...previousValue,
            [name]: value
        }));

    };
    useEffect(() => {
        const test = async (id) => {
            const response = await getCustomerDetail(id);
            setInput(() => ({
                name : response.data.result.name,
                phone : response.data.result.phone,
                email : response.data.result.email
            }))
            console.log(response.data.result)
        }
        test(id);
    }, [])

      const handleSubmit =async (e) => {
        e.preventDefault();
    }
      
    return (
        <>
       <div className="container mt-4" >
         
         <div className="row justify-content-center">

             <div className="col-md-4">

                 <form className="form" onSubmit={(e) => handleSubmit(e)}>
                     <h2>Customer Detail</h2>
                     <div className="form-group" >
                         <div className="row">
                             <div className="col-md-4">
                                 <label>Customer Name</label>
                             </div>
                             <div className="col-md-8">
                                 <input type="text" className="form-control" placeholder="Enter Your Customer name"
                                     name="customername"   value={input.name} 
                                   readOnly />
                            
                             </div>
                         </div>
                         <br />
                         <div className="row">
                             <div className="col-md-4">
                                 <label>Phone No.</label>
                             </div>
                             <div className="col-md-8">
                                 <input type="text" className="form-control" placeholder="Enter Your Phone No." 
                                 name="phone"   value={input.phone}   readOnly />
                                 
                             </div>
                         </div>

                         <br />
                         <div className="row">
                             <div className="col-md-4">
                                 <label>Email</label>
                             </div>
                             <div className="col-md-8">
                                 <input type="email" className="form-control" placeholder="Enter Your Email"
                                     name="email"   value={input.email} 
                                     readOnly  />
                               
                             </div>
                         </div>

                         <br />
                         <Link to="/customerlist">
                         <button className="btn btn-md btn-primary">Back</button></Link>
                                        </div>
                 </form>

             </div>

         </div>

     </div>
            
        </>
    )
}
export default ViewCustomer

