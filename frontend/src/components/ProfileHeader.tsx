import { LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const ProfileHeader = () => {
  const { logout, authUser, updateProfile } = useAuthStore();

  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result as string;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="w-full flex flex-row items-center justify-between gap-4 p-4 border-b border-slate-700/50">
      <div className="flex items-center justify-center">
        <div className="avatar avatar-online px-1">
          <button
            className="size-12 rounded-full overflow-hidden relative group"
            onClick={() => {
              if (fileInputRef.current)
                (fileInputRef.current as HTMLInputElement).click();
            }}
          >
            <img
              src={selectedImg || authUser?.profilePic || "/avatar.png"}
              alt="avatar"
              className="object-cover size-full"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
              <span className="text-white text-xs">Change</span>
            </div>
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
        <div className="flex gap-1 flex-col ml-3">
          <h3 className="text-slate-200 font-semibold max-w-[45] truncate">
            {authUser?.fullName}
          </h3>
          <span className="text-xs text-slate-400">Online</span>
        </div>
      </div>
      <button
        className="btn bg-red-500 hover:bg-red-400 btn-square size-8"
        onClick={logout}
      >
        <LogOut className="text-white size-5" />
      </button>
    </div>
  );
};

export default ProfileHeader;
