import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useSelector((store) => store.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        { emailId, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.user || res.data));
      navigate("/feed");
    } catch (err) {
      setErrorMessage(
        err?.response?.data?.message ||
          err?.response?.data ||
          "Invalid Credentials!"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  useEffect(() => {
  if (user) {
    navigate("/feed");
  }
}, [user, navigate]);

  return (
    <div className="w-full flex items-center justify-center px-4 sm:px-6 md:px-0 py-24">
      <div className="w-full max-w-md bg-neutral-900/70 backdrop-blur-md shadow-2xl rounded-3xl p-6 sm:p-8">

        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Login to DevTinder
        </h2>

        {/* Email */}
        <label className="text-sm font-medium">Email</label>
        <input
          type="email"
          className="input input-bordered w-full mt-1"
          placeholder="Enter your email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        {/* Password */}
        <label className="text-sm font-medium mt-4 block">Password</label>
        <input
          type="password"
          className="input input-bordered w-full mt-1"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        {/* Error Message */}
        {errorMessage && (
          <p className="text-red-500 text-sm mt-3 font-medium">
            {errorMessage}
          </p>
        )}

        {/* Login Button */}
        <button
          className="btn btn-primary w-full mt-6"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Login"
          )}
        </button>

        {/* Divider */}
        <div className="divider text-sm">OR</div>

        {/* Signup Option */}
        <p className="text-center text-sm">
          Don't have an account?{" "}
          <Link
            to="/signuppage"
            className="text-primary font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;