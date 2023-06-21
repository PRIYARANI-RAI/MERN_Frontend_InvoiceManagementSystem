import { useNavigate, Link } from 'react-router-dom';
import './Sidebar.css'
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { userlogout } from './Slice/authSlice';
import './Navbar.css'
import { toast } from 'react-toastify';
import { useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  console.log(user.isLoggedIn)

  const logoutHandler = () => {
    localStorage.removeItem("users");
    localStorage.clear()
    dispatch(userlogout());
    toast.success('Logout Successfully',
      { position: toast.POSITION.TOP_RIGHT },
      { autoClose: 1000 },
    )
    navigate("/")
  }

  return (
    <header id="header ">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <div className="text-left">
            <Link to="/"><i class="fa fa-solid fa-house-user"></i> Home</Link>
            <Link to="/about"> About Us</Link>
            <Link to="/contact"><i class="fa fa-solid fa-envelopes"></i> Contact Us</Link>
          </div>

          <div className='text-right'>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto " >
                {user.isLoggedIn ? (
                  <div>
                    <button className="btn btn-md btn-primary"
                      onClick={logoutHandler} ><i class="fa-solid fa-power-off"></i>Logout</button>
                  </div>
                ) : (
                  <div>
                    <Link to="/admin/login"><i class="fa fa-solid fa-right-to-bracket">
                    </i> Login</Link>

                  </div>

                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
export default Navbar