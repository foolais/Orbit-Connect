import { useChatStore } from "../store/useChatStore";

const ActiveTabSwitch = () => {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div
      role="tablist"
      className="p-4 tabs tabs-boxed w-full grid grid-cols-2 pb-0"
    >
      <button
        role="tab"
        onClick={() => setActiveTab("chats")}
        className={`tab-base  ${
          activeTab === "chats" ? "tab-active" : "tab-inactive"
        }`}
      >
        Chats
      </button>
      <button
        role="tab"
        onClick={() => setActiveTab("contacts")}
        className={`tab-base  ${
          activeTab === "contacts" ? "tab-active" : "tab-inactive"
        }`}
      >
        Contact
      </button>
    </div>
  );
};

export default ActiveTabSwitch;
