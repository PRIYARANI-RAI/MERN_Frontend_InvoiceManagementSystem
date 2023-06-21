import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { customeradd } from './service/auth.service';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';

const AddCustomer = () => {
    let navigate = useNavigate();
    const [input, setInput] = useState({
        name: " ",
        email: " ",
        phone: " "

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((previousValue) => ({
            ...previousValue,
            [name]: value
        }));

    };
    console.log(input)
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/customerlist")
    }

    const customeradded = async () => {
        try {
            const apiResponse = await customeradd(input.name, input.phone, input.email);
            if (apiResponse.data.status) {
                toast.success('Customer Added',
                    { position: toast.POSITION.TOP_RIGHT },
                    { autoClose: 1000 },
                )
                navigate("/customerlist");
            } else {
                toast.error('Customer Not Added',
                    { position: toast.POSITION.TOP_RIGHT },
                    { autoClose: 1000 },
                )
            }

        } catch (e) {
            console.warn(e)
        }
    }
    return (
        <div className="container mt-4">
            <div className="row justify-content-center ">
                <div className="col-md-4">
                    <form className="form" onSubmit={(e) => handleSubmit(e)}>
                        <h2>Add Customer</h2>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-4">
                                    <label>Customer Name</label>
                                </div>
                                <div className="col-md-8">
                                    <input type="text" className="form-control" name="name" onChange={handleChange} />

                                </div>
                            </div>
                            <br />

                            <div className="row">
                                <div className="col-md-4">
                                    <label>Email</label>
                                </div>
                                <div className="col-md-8">
                                    <input type="email" className="form-control" name="email" onChange={handleChange} />

                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-md-4">
                                    <label>Phone</label>
                                </div>
                                <div className="col-md-8">
                                    <input type="number" className="form-control" name="phone" onChange={handleChange} />

                                </div>
                            </div>
                            <br />

                            <button className="btn btn-md btn-primary" type="submit" class="btn btn-primary" onClick={customeradded} >Add customer</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddCustomer