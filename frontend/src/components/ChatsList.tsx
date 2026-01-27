import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import NoChatsFound from "./NoChatsFound";
import UserLoadingSkeleton from "./UserLoadingSkeleton";
import { Check } from "lucide-react";

const ChatsList = () => {
  const {
    getMyChatPartners,
    chats,
    isUsersLoading,
    selectedUser,
    setSelectedUser,
  } = useChatStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UserLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <div className="list-flex">
      {chats.map((chat) => (
        <div
          key={chat._id}
          onClick={() => setSelectedUser(chat)}
          className={`list-container ${
            selectedUser?._id === chat._id ? "bg-slate-700/50" : ""
          }`}
        >
          <div className="list-card">
            <div className={`avatar avatar-online`}>
              <div className="list-image-container">
                <img
                  src={chat.profilePic || "/avatar.png"}
                  alt={chat.fullName}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="grid gap-1">
              <h4 className="list-name">{chat.fullName}</h4>
              <div className="flex items-center space-x-1">
                <Check className="size-4" />
                <span className="text-sm max-w-52 truncate">
                  {chat.lastMessage.text}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatsList;
