import { useNavigate, Link } from "react-router-dom";
import { showlist, deleteCustomer } from "./service/auth.service";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';


const CustomerList = () => {
    let navigate = useNavigate();
    const [show, setShow] = useState([]);

    const addcuspage = () => {
        navigate("/addcus")
    }
    useEffect(() => {
        const showList = async () => {
            const result = await showlist()
            const arr = result.data.result;
            setShow(arr);
        }
        showList();
    }, [])

    const deleteData = async (_id) => {
        try{alert("Are you Sure?")
        const apiResponse = await deleteCustomer(_id)
        console.log(apiResponse.data)
        
        if(apiResponse.data.status){
            window.location.reload();
            toast.success('Customer Deleted',
            {position: toast.POSITION.TOP_RIGHT},
            {autoClose:1000},
            )
        }else{
            toast.error('Customer Not Deleted',
            {position: toast.POSITION.TOP_RIGHT},
            {autoClose:1000},
            )
        }
    }catch(e)
        {
            console.warn(e);
        }
    }

    return (
        <>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />

            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <div>
                            <button className="btn btn-dark" onClick={addcuspage}><i class="fa-solid fa-user-plus"></i>Add Customer
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row mt-4" style={{ 'display': 'inline-block' }}>
                    <table className="table table-primary table-striped">
                        <thead>
                            <tr>
                                <th>Sr No.</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Action</th>


                            </tr>
                        </thead>
                        <tbody>
                            {show.map((data, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{data.name}</td>
                                        <td>{data.phone}</td>
                                        <td>{data.email}</td>
                                        <td>  <Link to={`/view/${data._id}`}><button type="submit" className="btn btn-dark" >
                                        <i class="fa-solid fa-eye"></i></button>
                                            </Link>&nbsp;
                                            <Link to={`/edit/${data._id}`}><button type="submit" className="btn btn-dark" >
                                            <i class="fa-solid fa-pen-to-square"></i></button>
                                            </Link>&nbsp;
                                            <button type="submit" className="btn btn-dark" onClick={() => deleteData(data._id)}><i class="fa-solid fa-trash"></i></button>
                                        </td>

                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
export default CustomerList;