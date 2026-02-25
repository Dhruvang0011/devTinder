import axios from "axios";
import { Base_URL } from "../../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../../utils/requestSlice";

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request) || [];

  const [toast, setToast] = useState(null);

  /* ==============================
        FETCH REQUESTS
     ============================== */
  const fetchRequest = async () => {
    try {
      const res = await axios.get(
        Base_URL + "/user/requests/received",
        { withCredentials: true }
      );

      dispatch(addRequest(res?.data));
    } catch (err) {
      console.log(err?.message);
    }
  };

  /* ==============================
        ACCEPT / REJECT
     ============================== */
  const reviewRequest = async (status, requestId) => {
    try {
      await axios.post(
        Base_URL + `/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequest(requestId));

      setToast({
        message:
          status === "accepted"
            ? "Connection Request Accepted ✅"
            : "Connection Request Rejected ❌",
        type: status === "accepted" ? "success" : "error",
      });

      setTimeout(() => {
        setToast(null);
      }, 3000);

    } catch (err) {
      console.log(err?.message);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  return (
    <div className="w-full h-auto py-8 sm:py-8 px-4 sm:px-6 relative">

      {/* Toast */}
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-4">
          <div
            className={`px-5 py-3 rounded-xl shadow-lg text-white text-sm sm:text-base transition-all duration-300 ${
              toast.type === "success"
                ? "bg-emerald-600"
                : "bg-red-600"
            }`}
          >
            {toast.message}
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">
          Connection Requests
        </h1>

        {requests.length === 0 ? (
          <div className="text-center text-gray-400 mt-20 sm:mt-32 text-base sm:text-lg">
            No Requests Available!!
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div
                key={req._id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between
                           bg-white/5 backdrop-blur-md border border-white/10
                           rounded-xl p-4 gap-4 hover:bg-white/10
                           transition-all duration-200"
              >
                {/* User Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={req.fromUserId?.photoUrl}
                    alt="profile"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border border-white/20"
                  />

                  <div className="min-w-0">
                    <h2 className="text-white font-medium text-sm sm:text-base truncate">
                      {req.fromUserId?.firstName} {req.fromUserId?.lastName}
                    </h2>

                    <p className="text-xs sm:text-sm text-gray-400 truncate max-w-[200px] sm:max-w-xs">
                      {req.fromUserId?.skills?.join(", ")}
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => reviewRequest("accepted", req._id)}
                    className="bg-emerald-500 hover:bg-emerald-600
                               text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5
                               rounded-lg transition"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => reviewRequest("rejected", req._id)}
                    className="bg-red-500 hover:bg-red-600
                               text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5
                               rounded-lg transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Request;