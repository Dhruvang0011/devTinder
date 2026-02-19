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
    <div className="min-h-screen flex items-center justify-center my-4 p-4">
      <div className="bg-neutral-900/60 shadow-lg rounded-xl w-full max-w-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        {error && (
          <p className="text-red-500 text-base text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* First Name */}
          <div>
            <label className="block font-medium">First Name *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block font-medium">Last Name *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block font-medium">Age *</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />
          </div>

          {/* Skill */}
          <div>
            <label className="block font-medium">Skill *</label>
            <input
              type="text"
              name="skil"
              value={formData.skil}
              onChange={handleChange}
              placeholder="e.g. React, Node, C++"
              className="w-full border p-2 rounded-md"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block font-medium">Photo URL</label>
            <input
              type="text"
              name="photoUrl"
              value={formData.photoUrl}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block font-medium">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border p-2 rounded-md bg-neutral-900/60"
            >
              <option  value="">Select</option>
              <option  value="male">Male</option>
              <option  value="female">Female</option>
              <option  value="other">Other</option>
            </select>
          </div>

          {/* Email */}
          <div className="md:col-span-2">
            <label className="block font-medium">Email ID *</label>
            <input
              type="email"
              name="emailId"
              value={formData.emailId}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />
          </div>

          {/* Password */}
          <div className="md:col-span-2">
            <label className="block font-medium">Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />
          </div>

          {/* About */}
          <div className="md:col-span-2">
            <label className="block font-medium">About</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              rows="3"
              className="w-full border p-2 rounded-md"
            />
          </div>

          {/* Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Signup;
