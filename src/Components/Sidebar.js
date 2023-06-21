
import './Sidebar.css'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <>
            <div class="sidenav">
                
                    <Link to="Dashboard">Dashboard</Link>
                    <Link  to="customerlist">Customer</Link>
                    <Link to="Invoice">Invoice</Link>
            </div>
        </>
    )
}
export default Sidebar