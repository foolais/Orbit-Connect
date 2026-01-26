import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import type { Messages } from "../lib/type";
import MessageInput from "./MessageInput";
import { LoaderIcon } from "lucide-react";

const ChatContainer = () => {
  const { selectedUser, getMessagesByUserId, messages, isMessagesLoading } =
    useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectedUser?._id) getMessagesByUserId(selectedUser?._id);
  }, [getMessagesByUserId, selectedUser]);

  useEffect(() => {
    if (messageEndRef.current)
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isMessagesByUser = (message: Messages) => {
    return message.senderId === authUser?._id;
  };

  if (isMessagesLoading)
    return (
      <div className="flex items-center justify-center flex-1">
        <span className="ml-2">Loading messages...</span>
        <LoaderIcon className="size-5 animate-spin" />
      </div>
    );

  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8">
        {messages.length === 0 ? (
          <NoChatHistoryPlaceholder />
        ) : (
          messages.map((message) => (
            <div
              key={message._id}
              className={`chat p-2 ${
                isMessagesByUser(message) ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-header mb-1">
                <time className="text-xs opacity-75 flex items-center gap-1">
                  {new Date(message.createdAt).toLocaleTimeString().slice(0, 5)}
                </time>
              </div>
              <div
                className={`chat-bubble relative ${
                  isMessagesByUser(message)
                    ? "chat-bubble-primary"
                    : "chat-bubble-neutral"
                }`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt={message._id}
                    className="rounded-lg h-48 object-cover"
                  />
                )}
                {message.text && (
                  <p className={`text-sm ${message.image ? "mt-2" : "mt-0"}`}>
                    {message.text}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={messageEndRef} />
      </div>
      <MessageInput />
    </>
  );
};

export default ChatContainer;
