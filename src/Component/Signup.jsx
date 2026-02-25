import axios from "axios";
import { useState } from "react";
import { Base_URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    skil: "",
    photoUrl : "",
    gender: "",
    emailId: "",
    password: "",
    about: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { firstName, lastName, emailId, password, age, skil, about,photoUrl,gender } = formData;

    if (!firstName || !lastName || !emailId || !password || !age || !skil) {
      setError("Please fill all required fields (*)");
      return;
    }
try{  
    setError("");
    const res = await axios.post(Base_URL + "/signup",{
        firstName,
        lastName,
        photoUrl : photoUrl || undefined,
        emailId,
        password,
        gender,
        age : Number(age),
        skil : skil.split(",").map(s => s.trim()),
        about,
    },{withCredentials:true});

    navigate("/")
}catch(err){
    setError(err?.response?.data?.message || "Something went wrong");
}

  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 my-6">
    
    <div className="w-full max-w-2xl bg-base-100 shadow-2xl rounded-2xl p-8 border border-base-300">

      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-2">
        👨‍💻 Create Your DevTinder Account
      </h2>
      <p className="text-center text-sm text-gray-500 mb-6">
        Connect with developers around the world
      </p>

      {/* Error */}
      {error && (
        <div className="alert alert-error mb-4 text-sm">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >

        {/* First Name */}
        <div>
          <label className="label font-medium">First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="input input-bordered w-full focus:input-primary"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="label font-medium">Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="input input-bordered w-full focus:input-primary"
          />
        </div>

        {/* Age */}
        <div>
          <label className="label font-medium">Age *</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="input input-bordered w-full focus:input-primary"
          />
        </div>

        {/* Skill */}
        <div>
          <label className="label font-medium">Skills *</label>
          <input
            type="text"
            name="skil"
            value={formData.skil}
            onChange={handleChange}
            placeholder="React, Node, C++, etc."
            className="input input-bordered w-full focus:input-primary"
          />
        </div>

        {/* Photo URL */}
        <div>
          <label className="label font-medium">Photo URL</label>
          <input
            type="text"
            name="photoUrl"
            value={formData.photoUrl}
            onChange={handleChange}
            className="input input-bordered w-full focus:input-primary"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="label font-medium">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="select select-bordered w-full focus:select-primary"
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Email */}
        <div className="md:col-span-2">
          <label className="label font-medium">Email ID *</label>
          <input
            type="email"
            name="emailId"
            value={formData.emailId}
            onChange={handleChange}
            className="input input-bordered w-full focus:input-primary"
          />
        </div>

        {/* Password */}
        <div className="md:col-span-2">
          <label className="label font-medium">Password *</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input input-bordered w-full focus:input-primary"
          />
        </div>

        {/* About */}
        <div className="md:col-span-2">
          <label className="label font-medium">About</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            rows="3"
            className="textarea textarea-bordered w-full focus:textarea-primary"
          />
        </div>

        {/* Button */}
        <div className="md:col-span-2 mt-2">
          <button
            type="submit"
            className="btn btn-primary w-full text-lg"
          >
            🚀 Sign Up
          </button>
        </div>

      </form>

      {/* Login Line */}
      <div className="text-center mt-6 text-sm">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/")}
          className="text-primary font-semibold cursor-pointer hover:underline"
        >
          Login
        </span>
      </div>

    </div>
  </div>
);
};

export default Signup;
