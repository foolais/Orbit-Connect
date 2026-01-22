import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import NoChatsFound from "./NoChatsFound";
import UserLoadingSkeleton from "./UserLoadingSkeleton";

const ChatsList = () => {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser } =
    useChatStore();

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
          onClick={() => setSelectedUser(chat._id)}
          className="list-container"
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
            <h4 className="list-name">{chat.fullName}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatsList;
