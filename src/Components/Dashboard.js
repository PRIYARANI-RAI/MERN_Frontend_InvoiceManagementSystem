import { useEffect, useState } from 'react';
import Chart from "react-apexcharts"
import { showlistinvoice, showPaidList, showUnpaidList, listdata } from './service/auth.service';
import Sidebar from './Sidebar';

const Dashboard = () => {

    const [paidInvoice, setPaidInvoice] = useState([])
    const [unpaidInvoice, setUnpaidInvoice] = useState([])

    const [show, setShow] = useState([])

    useEffect(() => {
        const calc = async () => {
            const result = await listdata();
            const arr = result.data;
            setShow(arr);
        }
        calc()
    }, [])


    useEffect(() => {
        const showList = async () => {
            const result = await showlistinvoice()

            setShow(result.data.result)

            const result2 = await showPaidList()
            setPaidInvoice(result2.data.result)

            const result3 = await showUnpaidList()
            setUnpaidInvoice(result3.data.result)
        }
        showList();
    }, [])
    var allinvoice = show.length;

    var unpaid_invoices = unpaidInvoice.length;
    var paid_invoices = paidInvoice.length;


    return (
        <>
            <Sidebar />
            <div className="container">
                <div class="col main pt-5 mt-3">
                    <div class="row mb-3">
                        <div className="col-md-1"></div>
                        <div class="col-md-4 py-2">
                            <div class="card bg-success text-white h-50">
                                <div class="card-body bg-success">
                                    <div class="rotate">
                                        <i class="fa fa-user fa-4x"></i>
                                    </div>
                                    <h6 class="text-uppercase">Customers</h6>
                                    <h1 class="display-4">{show.result}</h1>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4 py-2">
                            <div class="card text-white bg-danger h-100">
                                <div class="card-body bg-danger">
                                    <div class="rotate">
                                        <i class="fa fa-list fa-4x"></i>
                                    </div>
                                    <h6 class="text-uppercase">Invoice</h6>
                                    <h1 class="display-4">{show.data}</h1>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="row mb-3">
                        <div className="col-md-1"></div>
                        <div class="col-md-4 py-2">
                            <div class="card bg-success text-white h-50">
                                <div class="card-body bg-success">
                                    <div class="rotate">
                                        <i class="fa fa-user fa-4x"></i>
                                    </div>
                                    <h6 class="text-uppercase">Paid</h6>
                                    <h1 class="display-4">{show.result}</h1>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4 py-2">
                            <div class="card text-white bg-danger h-100">
                                <div class="card-body bg-danger">
                                    <div class="rotate">
                                        <i class="fa fa-list fa-4x"></i>
                                    </div>
                                    <h6 class="text-uppercase">Unpaid</h6>
                                    <h1 class="display-4">{show.data}</h1>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
            <Chart
                type="donut"
                width={1000}
                height={300}
                series={[paid_invoices, unpaid_invoices]}
                options={{
                    labels: ["paid", "unpaid"],
                }}
            ></Chart>

        </>
    )
}
export default Dashboard;