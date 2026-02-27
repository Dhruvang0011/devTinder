import axios from "axios";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../../utils/feedSlice";
import { useEffect, useState } from "react";

const Feed = () => {
  const feed = useSelector((store) => store.feed) || [];
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const getFeed = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/feed`,
        { withCredentials: true }
      );

      dispatch(addFeed(res?.data || []));
    } catch (err) {
      console.log(err?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center px-4 sm:px-6 py-5">
        <div className="w-full max-w-md">
          <UserCard /> 
        </div>
      </div>
    );
  }

  /* =============================
        EMPTY FEED
     ============================= */
  if (feed.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h2 className="text-2xl font-semibold text-white">
          No More Users 😔
        </h2>
        <p className="text-gray-400 mt-2">
          Come back later for more connections!
        </p>
      </div>
    );
  }

  /* =============================
        FEED UI
     ============================= */
  return (
    <div className="w-full flex justify-center px-4 sm:px-6 py-5">
      <div className="w-full max-w-md">
        <UserCard user={feed[0]} />
      </div>
    </div>
  );
};

export default Feed;