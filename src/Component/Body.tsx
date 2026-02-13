import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { Base_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector((store) => store.user)
    const fetchUser = async () => {
        try{const user = await axios.get(Base_URL + "/profile/view",{
            withCredentials : true,
        });

        dispatch(addUser(user?.data))
        }catch(err){
            if(err.response?.status == 401){
            navigate("/");
            }
            console.log("Error:",err)
        }
    }

    useEffect(() => {
        if(!userData){
        fetchUser();
        } 
    }, [userData])
    return(
        <div className="min-h-screen flex flex-col bg-base-200">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
        <Outlet />
        </main>
        <Footer  />
        </div>
    )
}

export default Body;