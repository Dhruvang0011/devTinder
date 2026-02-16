import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Base_URL } from "../../utils/constants";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";

interface Message {
  _id: string;
  conversationId: string;
  senderId: string;
  text: string;
  createdAt: string;
}

interface ChatProps {
  conversationId: string | null;
}

const Chat = ({ conversationId }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const socketRef = useRef<Socket | null>(null);

  const user = useSelector((store: any) => store.user);

  /* ==============================
        CONNECT SOCKET ONCE
     ============================== */
  useEffect(() => {
    socketRef.current = io("http://localhost:3000", {
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
        RECEIVE MESSAGE (REGISTER ONCE)
     ============================== */
  useEffect(() => {
    if (!socketRef.current) return;

    const handleReceive = (message: Message) => {
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
          `${Base_URL}/message/${conversationId}`,
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
      senderId: user._id,
      text: newMessage,
    };

    socketRef.current.emit("sendMessage", messageData);

    setNewMessage("");
  };

  /* ==============================
        AUTO SCROLL
     ============================== */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!conversationId) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Select a conversation to start chatting
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => {
          const isMe = msg.senderId === user?._id;

          return (
            <div
              key={msg._id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-xs break-words ${
                  isMe
                    ? "bg-emerald-500 text-white"
                    : "bg-white/10 text-white"
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10 flex gap-3">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-xl bg-white/10 text-white focus:outline-none"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button
          onClick={sendMessage}
          className="px-5 py-2 bg-emerald-500 rounded-xl text-white font-semibold hover:bg-emerald-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
