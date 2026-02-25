import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const user = await axios.get(`${import.meta.env.VITE_API_URL}/profile/view`, {
        withCredentials: true,
      });

      dispatch(addUser(user?.data));
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/");
      }
      console.log("Error:", err?.message);
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow w-full px-4 sm:px-6 md:px-10 py-6">
        <div className="max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Body;