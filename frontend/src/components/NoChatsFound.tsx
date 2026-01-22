import { Contact, MessageCircle } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const NoChatsFound = () => {
  const { setActiveTab } = useChatStore();
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
      <div className="btn btn-circle btn-soft btn-xl">
        <MessageCircle className="size-7 text-primary" />
      </div>
      <div>
        <p className="text-slate-200 font-medium text-lg">No Chats Found</p>
        <p className="text-slate-400">Start a conversation with someone</p>
      </div>
      <button
        onClick={() => setActiveTab("contacts")}
        className="btn btn-sm btn-soft text-primary gap-2"
      >
        Find Contacts <Contact className="size-5" />
      </button>
    </div>
  );
};

export default NoChatsFound;
