import axios from "axios";
import { Base_URL } from "../../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../../utils/requestSlice";

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store: any) => store.request) || [];

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Fetch Requests
  const fetchRequest = async () => {
    try {
      const res = await axios.get(
        Base_URL + "/user/requests/received",
        { withCredentials: true }
      );

      dispatch(addRequest(res?.data));
    } catch (err: any) {
      console.log(err?.message);
    }
  };

  // Accept / Reject
  const reviewRequest = async (status: string, requestId: string) => {
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

    } catch (err: any) {
      console.log(err?.message);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-800 w-screen py-10 px-4 relative">

      {/* Toast */}
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
          <div
            className={`px-6 py-3 rounded-lg shadow-lg text-white transition-all duration-300 ${
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
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Connection Requests
        </h1>

        {requests.length === 0 ? (
          <div className="text-center text-gray-400 mt-52 text-lg">
            No Requests Available!!
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((req: any) => (
              <div
                key={req._id}
                className="flex items-center justify-between bg-white/5 
                           backdrop-blur-md border border-white/10 
                           rounded-xl px-4 py-3 hover:bg-white/10 
                           transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={req.fromUserId.photoUrl}
                    alt="profile"
                    className="w-12 h-12 rounded-full object-cover border border-white/20"
                  />

                  <div>
                    <h2 className="text-white font-medium">
                      {req.fromUserId.firstName}{" "}
                      {req.fromUserId.lastName}
                    </h2>

                    <p className="text-xs text-gray-400 truncate max-w-xs">
                      {req.fromUserId.skills?.join(", ")}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      reviewRequest("accepted", req._id)
                    }
                    className="bg-emerald-500 hover:bg-emerald-600 
                               text-white text-sm px-3 py-1.5 
                               rounded-lg transition"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      reviewRequest("rejected", req._id)
                    }
                    className="bg-red-500 hover:bg-red-600 
                               text-white text-sm px-3 py-1.5 
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
