import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const Chat = ({ conversationId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  const user = useSelector((store) => store.user);

  /* ==============================
        CONNECT SOCKET ONCE
     ============================== */
  useEffect(() => {
    socketRef.current = io(`${import.meta.env.VITE_API_URL}`, {
      withCredentials: true,
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  /* ==============================
        JOIN ROOM WHEN CHAT CHANGES
     ============================== */
  useEffect(() => {
    if (!conversationId || !socketRef.current) return;

    setMessages([]);
    socketRef.current.emit("joinConversation", conversationId);
  }, [conversationId]);

  /* ==============================
        RECEIVE MESSAGE
     ============================== */
  useEffect(() => {
    if (!socketRef.current) return;

    const handleReceive = (message) => {
      if (message.conversationId !== conversationId) return;

      setMessages((prev) => {
        if (prev.find((m) => m._id === message._id)) return prev;
        return [...prev, message];
      });
    };

    socketRef.current.on("receiveMessage", handleReceive);

    return () => {
      socketRef.current?.off("receiveMessage", handleReceive);
    };
  }, [conversationId]);

  /* ==============================
        FETCH OLD MESSAGES
     ============================== */
  useEffect(() => {
    if (!conversationId) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/message/${conversationId}`,
          { withCredentials: true }
        );

        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
  }, [conversationId]);

  /* ==============================
        SEND MESSAGE
     ============================== */
  const sendMessage = () => {
    if (!newMessage.trim() || !conversationId || !socketRef.current) return;

    const messageData = {
      conversationId,
      senderId: user?._id,
      text: newMessage,
    };

    socketRef.current.emit("sendMessage", messageData);
    setNewMessage("");
  };

  if (!conversationId) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Select a conversation to start chatting
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full bg-neutral-800">

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-6 space-y-4">
        {messages.map((msg) => {
          const isMe = msg.senderId === user?._id;

          return (
            <div
              key={msg._id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`
                  px-4 py-2 rounded-2xl text-sm sm:text-base
                  max-w-[75%] md:max-w-lg
                  break-words shadow-md
                  ${
                    isMe
                      ? "bg-emerald-500 text-white rounded-br-sm"
                      : "bg-white/10 text-white rounded-bl-sm"
                  }
                `}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input Section */}
      <div className="sticky bottom-0 bg-neutral-900 border-t border-white/10 px-3 sm:px-4 py-3">
        <div className="flex gap-2 sm:gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-xl bg-white/10 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button
            onClick={sendMessage}
            className="px-4 sm:px-5 py-2 bg-emerald-500 rounded-xl text-white text-sm sm:text-base font-semibold hover:bg-emerald-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;