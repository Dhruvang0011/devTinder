import axios from "axios";
import { Base_URL } from "../../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../../utils/requestSlice";

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store: any) => store.request);

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

  const reviewRequest = async (status: string, requestId: string) => {
    try {
      await axios.post(
        Base_URL + `/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequest(requestId));
    } catch (err: any) {
      console.log(err?.message);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <div className="text-center mt-10 text-xl font-semibold">
        No Requests Available!!
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-neutral-900/50 w-screen py-10 px-4">
    <div className="max-w-2xl mx-auto">
      
      <h1 className="text-2xl font-bold text-white mb-6">
        Connection Requests
      </h1>

      <div className="space-y-4">
        {requests.map((req: any) => (
          <div
            key={req._id}
            className="flex items-center justify-between bg-white/5 
                       backdrop-blur-md border border-white/10 
                       rounded-xl px-4 py-3 hover:bg-white/10 
                       transition-all duration-200"
          >
            {/* Left Section */}
            <div className="flex items-center gap-4">
              
              {/* Profile Image */}
              <img
                src={req.fromUserId.photoUrl}
                alt="profile"
                className="w-12 h-12 rounded-full object-cover border border-white/20"
              />

              {/* User Info */}
              <div>
                <h2 className="text-white font-medium">
                  {req.fromUserId.firstName} {req.fromUserId.lastName}
                </h2>

                <p className="text-xs text-gray-400 truncate max-w-xs">
                  {req.fromUserId.skil?.join(", ")}
                </p>
              </div>
            </div>

            {/* Right Section Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => reviewRequest("accepted", req._id)}
                className="bg-emerald-500 hover:bg-emerald-600 
                           text-white text-sm px-3 py-1.5 
                           rounded-lg transition"
              >
                Accept
              </button>

              <button
                onClick={() => reviewRequest("rejected", req._id)}
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

    </div>
  </div>
);

};

export default Request;
