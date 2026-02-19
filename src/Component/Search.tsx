import { useState, useEffect } from "react";
import axios from "axios";
import { Base_URL } from "../../utils/constants";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

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
        `${Base_URL}/user/search`,
        { firstName: value },
        { withCredentials: true }
      );

      setUsers(res.data);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  py-20 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-white mb-10">
          🔍 Find Developers
        </h1>

        {/* Search Input */}
        <div className="relative mb-10">
          <input
            type="text"
            placeholder="Search by first name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full p-4 pl-12 rounded-2xl bg-slate-800/70 backdrop-blur-md border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <span className="absolute left-4 top-4 text-gray-400">
            🔎
          </span>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-gray-400 animate-pulse">
            Searching developers...
          </div>
        )}

        {/* No Results */}
        {!loading && users.length === 0 && searchText.trim() && (
          <div className="text-center text-gray-400 bg-slate-800 p-6 rounded-xl border border-slate-700">
            No developers found 😔
          </div>
        )}

        {/* Results */}
        <div className="grid gap-6">
          {users.map((user) => (
            <div
              key={user?._id}
              className="group bg-slate-800/70 backdrop-blur-lg border border-slate-700 p-5 rounded-2xl shadow-lg hover:shadow-blue-500/20 hover:border-blue-500 transition duration-300"
            >
              <div className="flex items-center gap-5">
                <img
                  src={user?.photoUrl}
                  alt="profile"
                  className="w-20 h-20 rounded-full object-cover border-2 border-blue-500 group-hover:scale-105 transition duration-300"
                />

                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                    {user.about || "No bio available"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Search;
