import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { adminLogin } from './service/auth.service';
import { useDispatch } from "react-redux";
import { userlogin } from './Slice/authSlice';
import { toast } from 'react-toastify';

import { useSelector } from "react-redux";

export default function Login() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        email: "",
        password: "",

    });
    const [valid, setValid] = useState({
        email: true,
        password: true,
        emailError: "",
        passwordError: "",
    });
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    useEffect(() => {
        console.log("user data", isLoggedIn);
        if (isLoggedIn) {
            navigate("/Dashboard");
        }

    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((previousValue) => ({
            ...previousValue,
            [name]: value
        }));

    };

    const validateEmail = (email) => {

        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailIsValid = pattern.test(email);

        if (emailIsValid) {
            setValid((previousValue) => ({
                ...previousValue,
                email: true,
                emailError: ""
            }))
        } else {
            setValid((previousValue) => ({
                ...previousValue,
                email: false,
                emailError: "Please Enter Valid Email"
            }))
        }
    }
    const validatePassword = (password) => {
        if (password.length == 0) {
            setValid((previousValue) => ({
                ...previousValue,
                password: false,
                passwordError: "Please Enter Passoword"
            }))
        } else {
            setValid((previousValue) => ({
                ...previousValue,
                password: true,
                passwordError: ""
            }))
        }
    }
    const loginAuthor = async () => {
        try {
            const apiResponse = await adminLogin(input.email, input.password);
            console.log(apiResponse.data)
            if (apiResponse.data.status) {
                dispatch(userlogin(apiResponse.data));
                toast.success('Login Success',
                    { position: toast.POSITION.TOP_RIGHT },
                    { autoClose: 1000 },
                )
                navigate("/Dashboard");
            } else {
                toast.error('Invalid Credentials',
                    { position: toast.POSITION.TOP_RIGHT },
                    { autoClose: 1000 },
                )
            }
        }
        catch (e) {
            console.warn(e)
        }

    }
    const handleSubmit = (e) => {
        e.preventDefault();

    }

    return (
        <>
            <section >
                <div className="container">
                    <div className="row justify-content-center">
                        <div class="col-md-6 text-center mb-5">
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div className="col-md-12 col-lg-10">
                            <div class="wrap d-md-flex">
                                <div class="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
                                    <div class="text w-100">
                                        <h2>Welcome to login</h2>
                                    </div>
                                </div>
                                <div class="login-wrap p-4 p-lg-5">
                                    <div class="d-flex">
                                        <div class="w-100">
                                            <h3 class="mb-4">Admin Login</h3>
                                        </div>
                                    </div>
                                    <form class="signin-form" onSubmit={(e) => handleSubmit(e)}>
                                        <div className="form-groupmb-3 ">

                                            <label for="name" >Email</label>
                                            <input type="email" className="form-control" placeholder="Enter Your Email" name="email" onChange={handleChange} onBlur={(e) => validateEmail(e.target.value)} />
                                            {!valid.email && <span className="text-danger">{valid.emailError}</span>}
                                        </div>
                                        <div class="form-group mb-3">                                                <label class="label" for="password" >Password</label>
                                            <input type="password" className="form-control" name="password" placeholder="Enter Your Password" onChange={handleChange} onBlur={(e) => validatePassword(e.target.value)} />
                                            {!valid.password && <span className="text-danger">{valid.passwordError}</span>}
                                        </div>

                                        <div class="form-group">                                           <button type="submit" class="btn btn-primary" onClick={loginAuthor} >Login</button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
