import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../../utils/feedSlice";
import toast from "react-hot-toast";
import { useState } from "react";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const [showFullAbout, setShowFullAbout] = useState(false);

  const handleSendRequest = async (userId, status) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeFeed(userId));

      if (status === "intrested") {
        toast.success("🚀 Request Sent Successfully!");
      }

      if (status === "ignored") {
        toast("❌ User Ignored", {
          icon: "👀",
        });
      }
    } catch (err) {
      toast.error("Something went wrong ❌");
      console.log(err?.message);
    }
  };

  // Skeleton Loader
  if (!user) {
    return (
      <div className="relative w-full max-w-sm h-[520px] rounded-2xl overflow-hidden shadow-2xl animate-pulse bg-neutral-800"></div>
    );
  }

  const MAX_ABOUT_LENGTH = 120;
  const MAX_SKILLS = 4;

  const isLongAbout = user.about?.length > MAX_ABOUT_LENGTH;
  const displayedAbout = showFullAbout
    ? user.about
    : user.about?.slice(0, MAX_ABOUT_LENGTH) + (isLongAbout ? "..." : "");

  const displayedSkills = user.skil?.slice(0, MAX_SKILLS);
  const remainingSkills = user.skil?.length - MAX_SKILLS;

  return (
    <div className="relative w-full max-w-sm sm:max-w-md h-[520px] rounded-2xl overflow-hidden shadow-2xl">
      <img
        src={user.photoUrl}
        alt="User"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

      <div className="absolute bottom-0 w-full p-4 text-neutral-200 space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold">
          {user.firstName} {user.lastName}
        </h2>

        <p className="text-sm opacity-80">Age: {user.age}</p>

        {/* ABOUT SECTION */}
        <p className="text-sm">
          {displayedAbout}
          {isLongAbout && (
            <button
              onClick={() => setShowFullAbout(!showFullAbout)}
              className="ml-2 text-emerald-400 font-semibold hover:underline"
            >
              {showFullAbout ? "Show Less" : "Read More"}
            </button>
          )}
        </p>

        {/* SKILLS SECTION */}
        <div className="flex flex-wrap gap-2 mt-2">
          {displayedSkills?.map((s, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium rounded-full
                bg-white/20 backdrop-blur-md
                border border-white/30
                text-white"
            >
              {s}
            </span>
          ))}

          {remainingSkills > 0 && (
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 border border-white/20">
              +{remainingSkills} more
            </span>
          )}
        </div>

        {/* BUTTONS */}
        {user._id && (
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => handleSendRequest(user._id, "intrested")}
              className="flex-1 py-2 text-sm rounded-lg
                bg-gradient-to-r from-green-500 to-emerald-600
                text-white font-semibold
                hover:scale-105 transition-transform"
            >
              Send Request
            </button>

            <button
              onClick={() => handleSendRequest(user._id, "ignored")}
              className="flex-1 py-2 text-sm rounded-lg
                bg-black/60 border border-white/30
                text-white font-semibold
                hover:bg-red-500 hover:border-none
                transition-all"
            >
              Ignore
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;