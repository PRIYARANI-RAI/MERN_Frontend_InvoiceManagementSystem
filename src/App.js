import './App.css';
import About from './Components/Pages/About';
import Contact from './Components/Pages/Contact';
import Login from './Components/Login';
import { Route, Routes} from 'react-router-dom';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import { useSelector } from 'react-redux/es/exports';
import Home from './Components/Home';
import {ToastContainer} from 'react-toastify'
import AddCustomer from './Components/AddCustomer';
import CustomerList from './Components/CustomerList';
import Dashboard from './Components/Dashboard';
import EditCustomer from './Components/EditCustomer';
import Invoice from './Components/Invoice';
import InvoiceList from './Components/InvoiceList';
import EditInvoice from './Components/EditInvoice';
import ProtectedOutlet from './Protected'
import ViewCustomer from './Components/ViewCustomer';

function App() {
  const user = useSelector((state) => state.auth);
  return (
    <div className="App">

      <Navbar />
      {
        user.isLoggedIn ? (<div><Sidebar /> </div>) : (<div><Routes>
          <Route path="/" element={<Home />} ></Route>
          <Route path="/about" element={<About />} ></Route>
          <Route path="/contact" element={<Contact />} ></Route>        
        </Routes></div>)
      }
      <ToastContainer/>
      <div class="content">
      
                <Routes>
                <Route path="/admin/login" element={<Login />} ></Route>
                    <Route element={<ProtectedOutlet/>} >
                   <Route path="Dashboard" element={<Dashboard />} />
                    <Route path="customerlist" element={<CustomerList />} />
                    <Route path="Invoice" element={<InvoiceList />} />
                    <Route path="nvoice" element={<Invoice />} />
                    <Route path="addcus" element={<AddCustomer />} />
                    <Route path="edit/:id" element={<EditCustomer />} />
                    <Route path="view/:id" element={<ViewCustomer />} />
                    <Route path="edits/:id" element={<EditInvoice />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} ></Route>
          <Route path="/contact" element={<Contact />} ></Route>      
                    </Route>
                </Routes>
            </div>
    </div>
  );
}

export default App;
