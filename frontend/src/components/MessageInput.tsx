import { Image, Loader, Send, XIcon } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { sendMessages, isSendingMessage } = useChatStore();

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    sendMessages({ text: text.trim(), image: imagePreview ?? "" });
    setText("");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-4 border-t border-slate-600/30">
      {imagePreview && (
        <div className="max-w-3xl mx-auto mb-3 flex items-center">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-slate-700"
            />
            <button
              className="absolute -top-2 -right-2 btn btn-square btn-xs"
              onClick={removeImage}
              type="button"
            >
              <XIcon className="size-4" />
            </button>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSendMessage}
        className="max-w-3xl mx-auto flex space-x-4"
      >
        <div className="w-full">
          <input
            type="text"
            placeholder="Type a message"
            className="input w-full bg-slate-900"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center gap-2">
          <input
            className="hidden"
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            disabled={isSendingMessage}
          />
          <button
            type="button"
            className="btn btn-square btn-neutral"
            onClick={() => fileInputRef.current?.click()}
            disabled={isSendingMessage}
          >
            <Image className="size-6" />
          </button>
          <button
            type="submit"
            className="btn btn-square btn-primary ml-2"
            disabled={isSendingMessage || (!text.trim() && !imagePreview)}
          >
            {isSendingMessage ? (
              <Loader className="size-6 animate-spin" />
            ) : (
              <Send className="size-6" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
