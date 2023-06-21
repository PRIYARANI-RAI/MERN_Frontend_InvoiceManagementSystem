import React from 'react';
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getInvoiceDetail, updateIvoive } from "./service/auth.service";
import { toast } from 'react-toastify';

const EditIn = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [input, setInput] = useState({
        customername: "",
        email: "",
        status: ""
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
            const response = await getInvoiceDetail(id);
            setInput(() => ({
                customername: response.data.result.customername,
                email: response.data.result.email,
                status: response.data.result.status
            }))
        }
        test(id);
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updateResponse = await updateIvoive(input, id);
            if (updateResponse.data.status) {
                toast.success('Updated Successfully',
                    { position: toast.POSITION.TOP_RIGHT },
                    { autoClose: 1000 },
                )
                navigate("/Invoice");
            } else {
                toast.error('Update Failed',
                    { position: toast.POSITION.TOP_RIGHT },
                    { autoClose: 1000 },
                )
            }
            console.log("updated data==>", updateResponse.data);
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
                            <h2>Edit Invoice</h2>
                            <div className="form-group" >

                                <div className="row">
                                    <div className="col-md-4">
                                        <label>Customer Name</label>
                                    </div>
                                    <div className="col-md-8">
                                        <input type="text" className="form-control" placeholder="Enter Your Customer name"
                                            name="customername" value={input.customername} onChange={handleChange}
                                        />

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
                                            onChange={handleChange}
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
                                            onChange={handleChange}
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
                                <br />
                                <button type="submit" className="btn btn-md btn-primary" >Save</button>
                            </div>
                        </form>

                    </div>

                </div>

            </div>

        </>
    )
}
export default EditIn

