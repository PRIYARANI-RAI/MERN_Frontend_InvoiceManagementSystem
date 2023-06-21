import React from 'react';
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCustomerDetail, updatecustomer } from "./service/auth.service";
import { toast } from 'react-toastify';

const EditCustomer = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [input, setInput] = useState({
        name: "",
        email: "",
        phone: ""
    });
    const [loading, setLoading] = useState(false);
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
                name: response.data.result.name,
                phone: response.data.result.phone,
                email: response.data.result.email
            }))
        }
        test(id);
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updateResponse = await updatecustomer(input, id);
            if (updateResponse.data.status) {
                setLoading(true);
                toast.success('Updated Successfully',
                    { position: toast.POSITION.TOP_RIGHT },
                    { autoClose: 1000 },
                )
                setTimeout(() => {
                    navigate("/customerlist");
                }, 1000);
            } else {
                toast.error('Update Failed',
                    { position: toast.POSITION.TOP_RIGHT },
                    { autoClose: 1000 },
                )
            }

        } catch (e) {
            console.warn(e);
        }
    }

    return (
        <>
            <div className="container mt-4" >

                <div className="row justify-content-center">

                    <div className="col-md-4">

                        <form className="form" onSubmit={(e) => handleSubmit(e)}>
                            <h2>Edit Customer</h2>
                            <div className="form-group" >

                                <div className="row">
                                    <div className="col-md-4">
                                        <label>Customer Name</label>
                                    </div>
                                    <div className="col-md-8">
                                        <input type="text" className="form-control" placeholder="Enter Your Customer name"
                                            name="customername" value={input.name} onChange={handleChange}
                                        />

                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-md-4">
                                        <label>Phone No.</label>
                                    </div>
                                    <div className="col-md-8">
                                        <input type="text" className="form-control" placeholder="Enter Your Phone No." name="phone" value={input.phone} onChange={handleChange} />

                                    </div>
                                </div>

                                <br />
                                <div className="row">
                                    <div className="col-md-4">
                                        <label>Email</label>
                                    </div>
                                    <div className="col-md-8">
                                        <input type="email" className="form-control" placeholder="Enter Your Email"
                                            name="email" value={input.email} onChange={handleChange}
                                        />

                                    </div>
                                </div>

                                <br />
                                <button className="btn btn-md btn-primary" >
                                    {loading ? (
                                        <div class="spinner-border spinner-border-sm" role="status"></div>
                                    ) : (
                                        "Save"
                                    )}
                                </button>
                                {/* <button className="btn btn-md btn-primary" >Save</button> */}
                            </div>
                        </form>

                    </div>

                </div>

            </div>

        </>
    )
}
export default EditCustomer

