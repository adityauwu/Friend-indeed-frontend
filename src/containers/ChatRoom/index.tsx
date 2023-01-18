import React, { useState, useEffect, useRef } from "react";

import ChatMessage from "../../pages/MyChats/components/ChatMessage";
import UploadConversationImage from "../UploadConversationImage";
import { Input, Button, Menu, Dropdown, Modal } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import "./styles.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { stringify } from "rc-field-form/es/useWatch";
import { fetchConversation, selectData } from "../../pages/MyChats/MyChats.slice";
import { AsyncThunkAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { addMessages, getMessages } from "../../api/MessageRequests";
import { ROUTES } from "../../shared/utils/constants";

interface Props {
  user: any;
  selectedChat: any;
  contacts: any;
  handleSelectChat: any;
  receivedMessage: any;
  
}


export default function ChatRoom(props: Props) {



  
  const [messageText, setMessageText] = useState("");
  const [editGroupName, setEditGroupName] = useState(false);
  const [editGroupImage, setEditGroupImage] = useState(false);
 
  const [groupName, setGroupName] = useState("");
  const [loading, setLoading] = useState(false);
 

 
  
  
  
  //const [conversations,setConversations]= useState(chatter);



  const { selectedChat, handleSelectChat, user,receivedMessage} = props;

  const dispatch = useDispatch()
  const conversationchat=useAppSelector(selectData);

  const [conversations,setConversations] = useState([{}]);

  const [messages, setMessages] = useState([{}]);
  const [newMessage, setNewMessage] = useState("");

  // const handleChange = (newMessage : any)=> {
  //   setNewMessage(newMessage)
  // }
  
  const dummy = useRef<HTMLDivElement>(null);
  
  
  useEffect(() => {
   console.log("Fetching Messages between--->" + user.id + "---->" + selectedChat.id);
   
   const fetchMessages = async () => {
      try {
        const { data } = await getMessages(user.id, selectedChat.id);
        setMessages(data.data);
      } catch (error) {
        console.log(error);
      }
    
    };

    if (selectedChat !== null) fetchMessages();
  }, [selectedChat]);

  
  


// Always scroll to last Message
useEffect(()=> {
  if (dummy.current) {
        dummy.current.scrollIntoView({ behavior: "smooth" });
      }
},[messages])



// Send Message

// -----> uncomment form this part
const handleSend= async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  
  const message = {
    senderId : user.id,
    content: newMessage,
    receiverId: selectedChat.id,
}
const receiverId = selectedChat.id;
// send message to socket server  uncomment the line below
       //setSendMessage({...message, receiverId})
// send message to database
try {
  const { data } = await addMessages(message);
  console.log(data);
  setMessages(messages =>[...messages, data.data]);
  setNewMessage("");
}
catch
{
  console.log("error")
}
}

////--> uncomment till this partt


// Receive Message from parent component
useEffect(()=> {

if (receivedMessage !== null && receivedMessage.senderId === selectedChat.id && receivedMessage.receiverId == user.id) {
  console.log("Message Arrived: ", receivedMessage)
  setMessages(messages=>[...messages,receivedMessage]);
}

},[receivedMessage])





  
  
  // useEffect(() => {
  //   console.log("loading chats between#-->"+ user.id+ "#-->"+ selectedChat.id)
  
  //   dispatch(fetchConversation({senderId:user.id,receiverId:selectedChat.id}))
    
  //   setConversations(conversationchat.chatList);
     
  //   if (dummy.current) {
  //     dummy.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // },[selectedChat]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    
    setNewMessage(event.target.value);
  };

  const handleCreateMessage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    
    if (messageText && dummy.current) {
      conversations.push({
        content: messageText,
        createdBy: user.id,
        createdAt:new Date()
      }) 
      setConversations(conversations =>[...conversations,{  
        content: messageText,
        createdBy: user.id,
        createdAt:new Date()
      }]);
     
      console.log(conversations);
      // conversationchat.chatList.push({
      //   content: messageText,
      //   senderId: user.id,
      //   recieverId: selectedChat.id

      // })
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
        onClick={() => window.location.href=`${ROUTES.MY_PROFILE}?userId=${selectedChat.id}`
          
        }
      >
        View Profile
      </Menu.Item>
    
      <Menu.Item
        key="3"
        onClick={() => {
          // removeGroupImage(selectedChat.id);
        }}
      >
        Unsubscribe
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
                backgroundImage: `url('${selectedChat.imageUrl}')`

              }}
            >
              {selectedChat.imageUrl ? "" : ""}
            </div>
            
            <span>{selectedChat.name}</span>
            <Dropdown.Button
              overlay={menu}
              icon={<MoreOutlined style={{ fontSize: "1.65rem" }} />}
            />
          </header>
          <main>
            <div>
             <div ref={dummy} /> 
             
           
             
             {messages.map((msg: any, index:any) => {
                return (
                  <ChatMessage
                    key={index}
                    user={user}
                    selectedChat={selectedChat}
                    text={msg.content}
                    createdBy={msg.senderId}
                    createdAt={msg.createdAt}
                   
                  />
                );
              })}
           
            </div>
          </main>
          <footer>
            <form onSubmit={(e) => e.preventDefault()}>
              <Input
                type="text"
                value={newMessage}
                placeholder="Type a message"
                onChange={handleChange}
              />
              <Button onClick={handleSend}>Send message</Button>
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


