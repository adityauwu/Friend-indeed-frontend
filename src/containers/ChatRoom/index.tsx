import React, { useState, useEffect, useRef } from "react";

import ChatMessage from "../../pages/MyChats/components/ChatMessage";
import UploadConversationImage from "../UploadConversationImage";
import { Input, Button, Menu, Dropdown, Modal } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import "./styles.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectData, sendMessage } from "../../pages/MyChats/MyChats.slice";

interface Props {
  user: any;
  selectedChat: any;
  contacts: any;
  handleSelectChat: any;
}

export default function ChatRoom(props: Props) {
  const dispatch = useAppDispatch();
  const message = useAppSelector(selectData);
  console.log(message)
  const [messageText, setMessageText] = useState("");
  const [editGroupName, setEditGroupName] = useState(false);
  const [editGroupImage, setEditGroupImage] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [loading, setLoading] = useState(false);

  const chatter = [
    {
      
      text: "testing chat 01",
      createdBy: "aditya",
    
      },
    {
      
      text: "testing chat 02",
      createdBy: "aditya",
     
    },
    {
      
      text: "tesing chat 03",
      createdBy: "sanyam",
      
    },
  ]
  
  
  
  const [conversations,setConversations]= useState(chatter);



  const { selectedChat, handleSelectChat, contacts, user } = props;

  const dummy = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(sendMessage());

    if (dummy.current) {
      dummy.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleMessageOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    
    setMessageText(event.target.value);
  };

  const handleCreateMessage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    
    if (messageText && dummy.current) {
       setConversations(conversations=>[...conversations,{  
        text: messageText,
        createdBy: "aditya"
      }]);
      
      // chatter.push({
      //   text: messageText,
      //   createdBy: "aditya"
      // })
      
      // createMessage({
      //   text: messageText,
      //   groupId: selectedChat.id,
      // });
      setMessageText("");

      dummy.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleGroupNameInputOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGroupName(event.target.value);
  };

  const handleChangeNameDialog = () => {
    setEditGroupName(!editGroupName);
  };



  const handleChangingGroupImage = () => {
    setEditGroupImage(!editGroupImage);
  };

  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        onClick={() => {
          handleChangeNameDialog();
        }}
      >
        Edit group name
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => {
          handleChangingGroupImage();
        }}
      >
        Change group icon
      </Menu.Item>
      <Menu.Item
        key="3"
        onClick={() => {
          // removeGroupImage(selectedChat.id);
        }}
      >
        Remove group icon
      </Menu.Item>
      <Menu.Item
        key="4"
        onClick={() => {
          // deleteGroup(selectedChat.id);
          handleSelectChat(null);
        }}
      >
        Exit group
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="chat-container">
        <div className="chat-container__background">
          <header>
            <div
              className="image"
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {selectedChat.photoURL ? "" : ""}
            </div>
            <span>{selectedChat.groupName}</span>
            <Dropdown.Button
              overlay={menu}
              icon={<MoreOutlined style={{ fontSize: "1.65rem" }} />}
            />
          </header>
          <main>
            <div>
             {/* <div ref={dummy} />  */}
             
           
             
             {conversations.map((msg: any, index) => {
                return (
                  <ChatMessage
                    key={index}
                    text={msg.text}
                    createdBy={msg.createdBy}
                   
                   
                  />
                );
              })}
           
            </div>
          </main>
          <footer>
            <form onSubmit={(e) => e.preventDefault()}>
              <Input
                type="text"
                value={messageText}
                placeholder="Type a message"
                onChange={handleMessageOnChange}
              />
              <Button onClick={handleCreateMessage}>Send message</Button>
            </form>
          </footer>
        </div>
      </div>
      <Modal
        title="New Conversation Subject"
        visible={editGroupName}
        onCancel={handleChangeNameDialog}
        okText="Change Subject"
        confirmLoading={loading}
      >
        <Input
          type="text"
          placeholder={selectedChat.groupName}
          style={{ marginBottom: 6 }}
          onChange={handleGroupNameInputOnChange}
        />
      </Modal>

      <UploadConversationImage
        selectedChat={selectedChat}
        isVisible={editGroupImage}
        handleChangingGroupImage={handleChangingGroupImage}
      />
    </>
  );
}
