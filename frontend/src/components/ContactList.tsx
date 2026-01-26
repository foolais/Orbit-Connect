import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UserLoadingSkeleton from "./UserLoadingSkeleton";

const ContactList = () => {
  const { getAllContacts, allContact, isUsersLoading, setSelectedUser } =
    useChatStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UserLoadingSkeleton />;

  return (
    <div className="list-flex">
      {allContact.map((contact) => (
        <div
          key={contact._id}
          onClick={() => setSelectedUser(contact)}
          className="list-container"
        >
          <div className="list-card">
            <div className={`avatar avatar-online`}>
              <div className="list-image-container">
                <img
                  src={contact.profilePic || "/avatar.png"}
                  alt={contact.fullName}
                  className="object-cover"
                />
              </div>
            </div>
            <h4 className="list-name">{contact.fullName}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
