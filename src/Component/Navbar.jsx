import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/logout`,
        {},
        { withCredentials: true }
      );

      dispatch(removeUser());
      navigate("/");
    } catch (err) {
      console.log(err?.message);
    }
  };

  return (
    <div className="drawer">
      <input id="main-drawer" type="checkbox" className="drawer-toggle" />

      {/* PAGE CONTENT */}
      <div className="drawer-content">
        <div className="navbar bg-accent-content shadow-sm">

          {/* LEFT SIDE */}
          <div className="navbar-start">
            {user && (
              <label
                htmlFor="main-drawer"
                className="btn btn-ghost btn-circle drawer-button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </label>
            )}
          </div>

          {/* CENTER */}
          <div className="navbar-center">
            {!user ? (
              <span className="btn btn-ghost text-xl">
                👨‍💻 DevTinder
              </span>
            ) : (
              <Link to="/feed" className="btn btn-ghost text-xl">
                👨‍💻 DevTinder
              </Link>
            )}
          </div>

          {/* RIGHT SIDE */}
          {user && (
            <div className="navbar-end">

              {/* SEARCH */}
              <Link to="/search">
                <button className="btn btn-ghost btn-circle">
                  🔍
                </button>
              </Link>

              {/* REQUESTS */}
              <Link to="/requests">
                <button className="btn btn-ghost btn-circle mx-0.5">
                  🔔
                </button>
              </Link>

              {/* AVATAR DROPDOWN */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar mx-2"
                >
                  <div className="w-10 rounded-full">
                    <img
                      src={user?.photoUrl}
                      alt="User avatar"
                    />
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SIDEBAR */}
      {user && (
        <div className="drawer-side z-50">
          <label
            htmlFor="main-drawer"
            className="drawer-overlay"
          ></label>

          <ul className="menu p-6 w-72 min-h-full bg-base-200 text-base-content space-y-2">

            <li className="text-xl font-bold mb-4">
              👨‍💻 DevTinder
            </li>

            <li>
              <Link to="/feed">🏠 Feed</Link>
            </li>

            <li>
              <Link to="/connections">🤝 Connections</Link>
            </li>

            <li>
              <Link to="/search">🔎 Search</Link>
            </li>

            <li>
              <Link to="/requests">📩 Requests</Link>
            </li>

            <li>
              <Link to="/profile">👤 Profile</Link>
            </li>

            <div className="divider"></div>

            <li>
              <button
                onClick={handleLogout}
                className="text-error font-semibold"
              >
                🚪 Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;