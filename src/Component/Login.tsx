import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { Base_URL } from "../../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const res = await axios.post(
        Base_URL + "/login",
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

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="rounded-3xl w-96 bg-neutral-900/60 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Login to DevTinder</h2>

        {/* Email */}
        <label className="label">Email</label>
        <input
          type="email"
          className="input input-bordered w-full"
          placeholder="Enter your email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        {/* Password */}
        <label className="label mt-4">Password</label>
        <input
          type="password"
          className="input input-bordered w-full"
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
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Divider */}
        <div className="divider">OR</div>

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
