import { useNavigate, Link } from "react-router-dom";
import { showlistinvoice, deleteInvoice } from "./service/auth.service";
import { useState, useEffect } from "react";
import jspdf from "jspdf";
import { toast } from 'react-toastify';

const InvoiceList = () => {
    let navigate = useNavigate();
    const addinvoice = () => {
        navigate("/nvoice")
    }
    const [show, setShow] = useState([]);

    for (let i in show) {
        console.log(show[i].item)
    }

    useEffect(() => {
        const showList = async () => {
            const result = await showlistinvoice()
            const arr = result.data.result;
            setShow(arr);
            console.log("invoice list", result)
        }
        showList();
    }, [])
    const deleteData = async (_id) => {
        alert("Are you Sure?")
        const apiResponse = await deleteInvoice(_id)
        console.log(apiResponse.data)
        if (apiResponse.data.status) {
            window.location.reload();
            toast.success('Invoice Deleted',
                { position: toast.POSITION.TOP_RIGHT },
                { autoClose: 1000 },
            )
        } else {
            toast.error('Invoice Not Deleted',
                { position: toast.POSITION.TOP_RIGHT },
                { autoClose: 1000 },
            )
        }
    }
    const pdfGenerator = (data) => {
        var doc = new jspdf('landscape', 'px', 'a4', 'false')
        doc.setFont('Helvertica', 'bold')
        doc.text(60, 60, `Customer Name:${data.customername}`)
        doc.text(60, 80, `Product Name:${data.item[0].productname}`)
        doc.text(60, 100, `Quantity:${data.item[0].quantity}`)
        doc.text(60, 140, `Price:${data.item[0].price}`)
        doc.text(60, 160, `Tax:${data.item[0].tax}`)
        doc.text(60, 180, `Total:${data.item[0].total}`)
        doc.text(60, 120, `Grand Total:${data.grandtotal}`)
        doc.text(60, 120, `Status:${data.status}`)
        doc.save(`${data.customername}.pdf`)
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
                            <button className="btn btn-dark" onClick={addinvoice}><i class="fa-solid fa-user-plus"></i>Add Invoice
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
                                <th>Grand Total</th>
                                <th>Status</th>
                                <th>Print</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {show.map((data, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{data.customername}</td>
                                        <td>{data.grandtotal}</td>
                                        <td>{data.status}</td>
                                        <td><button type="submit" className="btn btn-dark" onClick={(e) => pdfGenerator(data)}><i class="fa-sharp fa-solid fa-download"></i></button></td>
                                        <td>
                                            <Link to={`/edits/${data._id}`}><button type="submit" className="btn btn-dark" >
                                                <i class="fa-solid fa-pen-to-square"></i></button></Link>&nbsp;
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

export default InvoiceList