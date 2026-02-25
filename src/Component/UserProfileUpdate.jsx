import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { Base_URL } from "../../utils/constants";
import { addUser } from "../../utils/userSlice";

const UserProfileUpdate = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch()

  const [error , seterror] = useState(" ")
  const [firstName, setfName] = useState(user?.firstName || "");
  const [lastName, setlName] = useState(user?.lastName || "");
  const [photoUrl, setphotoUrl] = useState(user?.photoUrl);
  const [age, setage] = useState(user?.age?.toString() || "");
  const [gender, setgender] = useState(user?.gender || "");
  const [skil, setskil] = useState(user?.skil?.join(", ") || "");
  const [about, setabout] = useState(user?.about || "");
  const [notification , setnotification] = useState(false)
  console.log(skil)
  useEffect(() => {
  if (user) {
    setfName(user.firstName || "");
    setlName(user.lastName || "");
    setphotoUrl(user.photoUrl || "");
    setage(user.age.toString() || "");
    setgender(user.gender || "");
    setskil(user.skil?.join(",") || "");
    setabout(user.about || "");
  }
}, [user]);


  const saveUser = async(e) => {
    e.preventDefault();
    seterror("")
    try{
      const res = await axios.patch(Base_URL + "/profile/update",{
              firstName,
              lastName,
              photoUrl,
              age:Number(age),
              gender,
              about,
              skil:skil.split(",").map(s => s.trim()),
            },{withCredentials:true});
            dispatch(addUser(res?.data?.data))
            setnotification(true)
            setTimeout(() => {
              setnotification(false)
            },3000);
    }catch(err){
      seterror(err?.response.data)
    }
  }

  return (
  <div className="min-h-screen bg-neutral-900/80 px-4 sm:px-6 py-8 overflow-y-auto rounded-3xl">

    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-2">

      {/* FORM */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            ✨ Update Your Profile
          </h2>

          <form onSubmit={saveUser} className="space-y-5">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setfName(e.target.value)}
              />
              <input
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setlName(e.target.value)}
              />
            </div>

            <input
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Profile Photo URL"
              value={photoUrl}
              onChange={(e) => setphotoUrl(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                disabled
                className="w-full px-4 py-3 rounded-lg bg-black/60 border border-white/10 text-gray-400 cursor-not-allowed"
                value={user?.emailId}
              />
              <input
                disabled
                type="password"
                className="w-full px-4 py-3 rounded-lg bg-black/60 border border-white/10 text-gray-400 cursor-not-allowed"
                value={user?.password}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Age"
                value={age}
                onChange={(e) => setage(e.target.value)}
              />

              <select
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/20 text-white focus:outline-none"
                value={gender}
                onChange={(e) => setgender(e.target.value)}
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <input
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Skills (comma separated)"
              value={skil}
              onChange={(e) => setskil(e.target.value)}
            />

            <textarea
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[100px]"
              placeholder="About you"
              value={about}
              onChange={(e) => setabout(e.target.value)}
            />

            <div className="text-red-500 font-bold">{error}</div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold hover:scale-105 transition-transform"
            >
              Save Changes
            </button>
            
            {notification && <div role="alert" className="alert alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Your Data Saved!!!</span>
          </div>}
          </form>
        </div>

        {/* LIVE PREVIEW */}
        <div className="flex justify-center lg:justify-end mt-10">
          <UserCard
            user={{
              firstName,
              lastName,
              photoUrl,
              age,
              gender,
              about,
              skil:skil.split(",").map(s => s.trim()),
            }}
          />
        </div>

      </div>
    </div>
  );
};

export default UserProfileUpdate;
