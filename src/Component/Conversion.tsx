import { useEffect, useState } from "react";
import axios from "axios";
import { Base_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addconversation } from "../../utils/conversation";
import Chat from "./ChatPage";

const Conversations = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const dispatch = useDispatch();

  const conversations = useSelector((store: any) => store.conversation);
  const logedInUser = useSelector((store: any) => store.user);

  const fetchConversations = async () => {
    try {
      const res = await axios.get(Base_URL + "/conversations", {
        withCredentials: true,
      });

      dispatch(addconversation(res?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, [conversations]);

  return (
    <div className="h-screen flex bg-neutral-800 w-full overflow-y-hidden">
      
      {/* LEFT SIDE - Conversation List */}
      <div className="w-1/3 border-r border-white/10 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Chats</h1>

        <div className="space-y-4">
          {conversations?.map((conv: any) => {
            const otherUser = conv.participants?.find(
              (p: any) => p._id !== logedInUser?._id
            );

            if (!otherUser) return null;

            return (
              <div
                key={conv._id}
                onClick={() => setSelectedConversation(conv._id)}
                className={`flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:bg-white/20 ${
                  selectedConversation === conv._id ? "bg-white/20" : ""
                }`}
              >
                <img
                  src={otherUser.photoUrl}
                  alt={otherUser.firstName}
                  className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500"
                />

                <div className="flex-1">
                  <h2 className="text-white font-semibold text-lg">
                    {otherUser.firstName} {otherUser.lastName}
                  </h2>

                  <p className="text-gray-300 text-sm truncate">
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

      {/* RIGHT SIDE - Chat Window */}
      <div className="w-2/3">
        {selectedConversation ? (
          <Chat conversationId={selectedConversation} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-lg">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default Conversations;
