import { Image, Send } from "lucide-react";

const MessageInput = () => {
  return (
    <div className="flex justify-center items-center p-4 gap-4 border-t border-slate-600/30">
      <div className="w-full">
        <input
          type="text"
          placeholder="Type a message"
          className="input w-full bg-slate-900"
        />
      </div>
      <div className="flex items-center justify-center gap-2">
        <button className="btn btn-square btn-neutral">
          <Image className="size-6" />
        </button>
        <button className="btn btn-square btn-primary ml-2">
          <Send className="size-6" />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
