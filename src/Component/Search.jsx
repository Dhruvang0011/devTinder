import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sendingId, setSendingId] = useState(null);

  useEffect(() => {
    const trimmed = searchText.trim();

    if (!trimmed) {
      setUsers([]);
      return;
    }

    const debounce = setTimeout(() => {
      handleSearch(trimmed);
    }, 500);

    return () => clearTimeout(debounce);
  }, [searchText]);

  const handleSearch = async (value) => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/search`,
        { firstName: value },
        { withCredentials: true }
      );

      setUsers(res.data);
    } catch (err) {
      toast.error("Search failed ❌");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendRequest = async (userId) => {
    try {
      setSendingId(userId);

      const toastId = toast.loading("Sending request...");

      await axios.post(
        `${import.meta.env.VITE_API_URL}/request/send/intrested/${userId}`,
        {},
        { withCredentials: true }
      );

      toast.dismiss(toastId);
      toast.success("🚀 Request Sent Successfully!");

      // Remove user from UI instantly
      setUsers(prev => prev.filter(u => u._id !== userId));

    } catch (err) {
      toast.error("Failed to send request ❌");
      console.error("Request error:", err);
    } finally {
      setSendingId(null);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-2xl font-bold text-center text-white mb-10">
          🔍 Find Developers
        </h1>

        {/* Search Input */}
        <div className="relative mb-10">
          <input
            type="text"
            placeholder="Search by first name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full p-3 pl-10 rounded-xl bg-slate-800/70 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <span className="absolute left-3 top-3 text-gray-400">🔎</span>
        </div>

        {loading && (
          <div className="text-center text-gray-400 animate-pulse">
            Searching developers...
          </div>
        )}

        {!loading && users.length === 0 && searchText.trim() && (
          <div className="text-center text-gray-400 bg-slate-800 p-6 rounded-xl border border-slate-700">
            No developers found 😔
          </div>
        )}

        {/* Results */}
        <div className="grid gap-5">
          {users.map((user) => (
            <div
              key={user?._id}
              className="group bg-slate-800/70 border border-slate-700 p-4 rounded-xl shadow hover:border-blue-500 transition duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <img
                    src={user?.photoUrl}
                    alt="profile"
                    className="w-16 h-16 rounded-full object-cover border border-blue-500"
                  />

                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                      {user.about || "No bio available"}
                    </p>
                  </div>
                </div>

                <button
                  disabled={sendingId === user._id}
                  onClick={() => handleSendRequest(user._id)}
                  className="shrink-0 px-4 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 
           disabled:bg-gray-500 disabled:cursor-not-allowed
           text-white rounded-lg transition"
                >
                  {sendingId === user._id ? "Sending..." : "Send Request"}
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Search;