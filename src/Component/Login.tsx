import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { Base_URL } from "../../utils/constants"

const Login = () => {

    const[ emailId,setemilId ] = useState("smit@gmail.com")
    const[ password,setpassword ] = useState("Smit@0011")
    const dispatch = useDispatch();
    const navigate = useNavigate()

    // Connect to Login Api
    const handleLogin = async() => {
        try{const res = await axios.post(Base_URL + "/login",{
            emailId,password
        },{ withCredentials : true});
        
        dispatch(addUser(res.data))
        return navigate("/feed");
        }catch(err){
            console.log(err)
        }
    }

    return(
    
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
    <legend className="fieldset-legend">Login</legend>

    <label className="label">Email</label>
    <input type="email" className="input" placeholder="Email" value={emailId} onChange={(e) => setemilId(e.target.value)}/>
 
    <label className="label">Password</label>
    <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)}/>

    <button className="btn btn-neutral mt-4" onClick={handleLogin}>Login</button>
    </fieldset>
    )
}
export default Login;