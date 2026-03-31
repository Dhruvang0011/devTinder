import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addconversation } from "../../utils/conversation";
import Chat from "./ChatPage";

const Conversations = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const dispatch = useDispatch();

  const conversations = useSelector((store) => store.conversation);
  const logedInUser = useSelector((store) => store.user);

  const fetchConversations = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/conversations`, {
        withCredentials: true,
      });

      dispatch(addconversation(res?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return (
  <div className="h-[calc(100dvh-100px)] px-3 sm:px-6 lg:px-0 py-0">
    
    {/* MAIN CONTAINER */}
    <div className="max-w-7xl mx-auto h-full bg-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex">
      {/* ================= LEFT SIDE ================= */}
      <div
        className={`
          ${selectedConversation ? "hidden md:flex" : "flex"}
          flex-col w-full md:w-1/3 border-r border-white/10
        `}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/10">
          <h1 className="text-2xl font-bold text-white">Chats</h1>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {conversations?.map((conv) => {
            const otherUser = conv.participants?.find(
              (p) => p._id !== logedInUser?._id
            );

            if (!otherUser) return null;

            return (
              <div
                key={conv._id}
                onClick={() => setSelectedConversation(conv._id)}
                className={`
                  flex items-center gap-4 p-4 rounded-2xl cursor-pointer
                  transition-all duration-300
                  ${
                    selectedConversation === conv._id
                      ? "bg-emerald-500/20"
                      : "bg-white/5 hover:bg-white/10"
                  }
                `}
              >
                <img
                  src={otherUser.photoUrl}
                  alt={otherUser.firstName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500"
                />

                <div className="flex-1 min-w-0">
                  <h2 className="text-white font-semibold truncate">
                    {otherUser.firstName} {otherUser.lastName}
                  </h2>

                  <p className="text-gray-400 text-sm truncate">
                    {conv.lastMessage && conv.lastMessageSender
                      ? `${conv.lastMessageSender.firstName}: ${conv.lastMessage}`
                      : "Start a conversation..."}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div
        className={`
          ${selectedConversation ? "flex" : "hidden md:flex"}
          flex-col w-full md:w-2/3 bg-neutral-850 h-full
        `}
      >
        {selectedConversation ? (
          <>
            {/* Mobile Back Button */}
            <div className="md:hidden p-4 border-b border-white/10">
              <button
                onClick={() => setSelectedConversation(null)}
                className="text-emerald-400 font-semibold"
              >
                ← Back
              </button>
            </div>


            <Chat conversationId={selectedConversation} />
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-lg">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  </div>
);
};

export default Conversations;