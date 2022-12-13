import React, { useState, useEffect } from "react";
import ContactCard from "../../pages/MyChats/components/ContactCard";
import SelectedContactPill from "../../pages/MyChats/components/SelectedContactPill"
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import "./styles.scss";
import { Button, Input, Modal } from "antd";

interface Props {
  creatingGroup: boolean;
  contacts: any[];
  handleShowCreateConversation: () => void;
  handleSelectChat: any;
}

export default function CreateConversation(props: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState(
    [] as any
  );
  const [availableContacts, setAvailableContacts] = useState(
    [] as any
  );
  const [searchInput, setSearchInput] = useState("");
  const [groupName, setGroupName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    creatingGroup,
    contacts,
    handleShowCreateConversation,
    handleSelectChat,
  } = props;

  useEffect(() => {
    if (contacts) {
      setAvailableContacts(contacts);
    }
  }, [contacts]);

  // updated available contacts
  useEffect(() => {
    if (selectedContacts.length > 0 && availableContacts) {
      const updatedAvailableContacts: any = [];

      [].forEach((available) => {
        // removed selected contacts from available
        // does available is in selectedContacts?
        // if no add her to updatedArray
        const wasSelected = [].some(
          (selected) => selected === available
        );

        if (!wasSelected) {
          updatedAvailableContacts.push(available);
        }
      });
      console.log(updatedAvailableContacts);
      setAvailableContacts(updatedAvailableContacts);
      console.log("also update here");
    }
  }, [selectedContacts.length]);

  const handleModalHide = () => {
    setIsModalVisible(false);
  };

  const handleModalShow = () => {
    setIsModalVisible(true);
  };

  const handleGroupOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(event.target.value);
  };

  const handleContactOnClick = (contact: any) => {
    setSelectedContacts(() => []);
  };

  const handleRemoveSelectedContact = (contact: any) => {
    const selectedContactsClone = [...selectedContacts];
    const updatedSelectedContacts = selectedContactsClone.filter(
      (selectedContact) => selectedContact.id !== contact.id
    );
    setSelectedContacts(updatedSelectedContacts);
    setAvailableContacts(() => []);
  };

  const handleCreateGroup = () => {
    setError("");
    setLoading(true);
    // createGroupChat({
    //   users: selectedContacts,
    //   groupName: groupName,
    //   isPrivate: selectedContacts.length < 1,
    // })
    //   .then((res) => {
    //     const groupId = res;
    //     setLoading(false);
    //     setIsModalVisible(false);
    //     handleShowCreateConversation();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setLoading(false);
    //     setError(err);
    //   });
  };

  let classname = "create-conversation";
  if (!creatingGroup) classname += " hide";
  else classname.replace("hide", "");

  return (
    <>
      <div className={classname}>
        <header>
          <div>
            <Button
              onClick={handleShowCreateConversation}
              icon={<ArrowLeftOutlined style={{ fontSize: "18px" }} />}
              size="large"
              type="text"
            />
            <div>Type Reciever's Name</div>
          </div>
        </header>
        <div className="search-contacts">
          <div className="search-input">
            {selectedContacts && (
              <div className="selected-contacts">
                {[].map((contact, index) => {
                  return (
                    <SelectedContactPill
                      key={index}
                      contactImage={contact}
                      contactName={contact}
                      onClick={() => handleRemoveSelectedContact(contact)}
                    />
                  );
                })}
              </div>
            )}
            <Input
              type="text"
              placeholder="Type contact name"
              onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
            />
          </div>

          <div className="contacts-list">
            {contacts?.map((contact, index) => {
              if (contact) {
                return (
                  <ContactCard
                    key={index}
                    contact={contact}
                    onClick={() => handleContactOnClick(contact)}
                  />
                );
              }
            })}
          </div>

          <div className="create-group-section">
            {selectedContacts.length > 0 && (
              <Button
                shape="circle"
                size="large"
                style={{ height: 48, width: 48 }}
                icon={<ArrowRightOutlined />}
                onClick={() => handleModalShow()}
              ></Button>
            )}
          </div>
        </div>
      </div>
      <Modal
        title="New group"
        visible={isModalVisible}
        onCancel={handleModalHide}
        onOk={handleCreateGroup}
        okText="Create Conversation"
        confirmLoading={loading}
      >
        <Input
          type="text"
          placeholder="What's the group's subject?"
          onChange={handleGroupOnChange}
          style={{ marginBottom: 6 }}
        />
        {error && (
          <span style={{ fontSize: "0.8rem", color: "red" }}>{error}</span>
        )}
      </Modal>
    </>
  );
}
