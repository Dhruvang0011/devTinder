import axios from "axios";
import { Base_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../../utils/userSlice";


const Navbar =  () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout =  async() => {
    try{
      await axios.post(Base_URL + "/logout",{},{withCredentials : true})
      dispatch(removeUser());
      return navigate("/")
    }catch(err){
      console.log(err)
    }
  }
    return(
  <div className="navbar bg-accent-content shadow-sm">
  <div className="navbar-start w-130">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
      </div>
      <ul
        tabIndex={-1}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-30 p-2 shadow">
        <li><Link to="/connections">Connections</Link></li>
        <li><a>Homepage</a></li>
        <li><a>About</a></li>
      </ul>
    </div>
  </div> 
  <div className="navbar-center">
    {(user && <Link to = "/feed" className="btn btn-ghost text-xl">👨‍💻 DevTinder</Link>)}
    {(!user && <a className="btn btn-ghost text-xl">👨‍💻 DevTinder</a>)}
  </div>
  
  {user && (<div className="navbar-end">
    <button className="btn btn-ghost btn-circle mx-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg>
    </button>

    <div className="dropdown dropdown-end">

  <div
    tabIndex={0}
    role="button"
    className="btn btn-ghost btn-circle avatar mx-2"
  >
    <div className="w-10 rounded-full">
      <img
        alt="User avatar"
        src= {user.photoUrl}
      />
    </div>
  </div>

  <ul
    tabIndex={-1}
    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
  >
    <li>
      <Link to= "/profile" className="justify-between">
        Profile
      </Link>
    </li>
    <li><a>Settings</a></li> 
    <li><a onClick={handleLogout}>Logout</a></li>
  </ul>
</div>
 

    <button className="btn btn-ghost btn-circle mx-2">
      <Link to="requests"><div className="indicator">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /> </svg>
        <span className="badge badge-xs badge-primary indicator-item"></span>
      </div></Link>
    </button>
  </div>
  )}
</div>
    );
}

export default Navbar;