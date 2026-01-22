import { MessageCircle } from "lucide-react";

const NoConversationChats = () => {
  return (
    <div className="flex items-center justify-center flex-1">
      <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
        <div className="btn btn-circle btn-soft btn-xl">
          <MessageCircle className="size-7 text-primary" />
        </div>
        <div>
          <p className="text-slate-200 font-medium text-lg">
            Your messages will appear here
          </p>
          <p className="text-slate-400">
            Choose someone on the left and say hello 👋
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoConversationChats;
