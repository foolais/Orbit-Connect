import { MessageCircle } from "lucide-react";

const NoChatHistoryPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center gap-4 h-full">
      <div className="btn btn-circle btn-soft btn-xl">
        <MessageCircle className="size-7 text-primary" />
      </div>
      <div>
        <p className="text-slate-200 font-medium text-lg">
          No Conversations Yet
        </p>
        <p className="text-slate-400">Say hello and start your first chat</p>
      </div>
    </div>
  );
};

export default NoChatHistoryPlaceholder;
