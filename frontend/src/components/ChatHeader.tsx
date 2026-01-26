import { X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedUser(null);
    };

    window.addEventListener("keydown", handleEscKey);

    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div className="flex items-center justify-between bg-slate-800/50 border-b border-l border-slate-700/50 p-4">
      <div className="flex items-center justify-center">
        <div className="avatar avatar-online px-1">
          <div className="size-12 rounded-full">
            <img
              src={selectedUser?.profilePic || "/avatar.png"}
              alt=""
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex gap-1 flex-col ml-3">
          <h3 className="text-slate-200 font-semibold max-w-[45] truncate">
            {selectedUser?.fullName}
          </h3>
          <span className="text-xs text-slate-400">Online</span>
        </div>
      </div>
      <button
        className="flex items-center justify-center btn btn-soft btn-square size-8"
        onClick={() => setSelectedUser(null)}
      >
        <X className="size-5" />
      </button>
    </div>
  );
};

export default ChatHeader;
