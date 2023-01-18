import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Row, Avatar, Typography, Tag } from "antd"
import { ClockCircleOutlined, CalendarOutlined } from "@ant-design/icons"
 import { STORAGE_USER_CONSTANT } from '../../shared/utils/constants';
import Menu from "../../containers/Menu";
import ChatRoom from "../../containers/ChatRoom";
import "./styles.scss";
import { useDispatch } from "react-redux";
import { fetchConversation, selectData } from "./MyChats.slice";
import { useAppSelector } from "../../redux/hooks";
import { set } from "lodash";
function MyChats() {
  
  const [selectedChat, setSelectedChat] = useState(null as any);



  //const [selectedChat, setSelectedChat] = useState({ "name": "first", "id": "12","groupName":"a" });
 
  const handleSelectChat = (chatname: any) => {
    
    setSelectedChat(chatname);
  
  };
  const currentUser = JSON.parse(String(localStorage.getItem(STORAGE_USER_CONSTANT)))

  // useEffect(() => {
  //   dispatch(fetchConversation({senderId:"456",receiverId:currentUser.id}))
  
  // },selectedChat);
  const message = {
    senderId : currentUser.id,
    content: "asdasdsadasd",
    receiverId: "123",
}


  return (
  
    <Container>
      {1 && (
        <AppContainer>
          <MenuCard>
            <Menu
              user={currentUser}
              contacts={{}}
              conversations={{}}
              handleSelectChat={handleSelectChat}
              handleRemoveContact={{}}
              handleAddContact={{}}
              handleUpdateContact={{}}
            />
          </MenuCard>
          <div className="app-container__content">


            {selectedChat ? (
              <>
                <ChatRoom
                  user={currentUser}
                  contacts={{} }
                  receivedMessage={message}
                  selectedChat={selectedChat}
                  handleSelectChat={{}}
                />
              </>
            ) : (
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  marginLeft: "50%",
                  display: "flex",
                  padding: "32px 20% 32px 32px",
                  alignItems: "center",
                  fontSize: "1rem",
                  fontWeight: 500,
                }}
              >
                Pick an existing conversation or create a new one to start
                chatting away
              </div>
            )}

          </div>
        </AppContainer>

      )}
    </Container>

  )


}


const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  z-index: 100;
  overflow: hidden;
  height: 68vh;
`

const StyledRow = styled(Row)`
  background-color: white;
  padding: 50px 0;
  display: flex;
  justify-content: center;
`

const MenuCard = styled.div`
 
  
 
  width: 30%;
  position: relative;
   display: flex;
  overflow: hidden;
  background-color : white;
  border-right: 1px solid #d9d9d9;

  `
const AppContainer = styled.div`
  top: 0;
  position: relative;
  height:100%;
  display: flex;
  
  overflow: hidden;

`
const StyledTag = styled(Tag)`
  border-radius: 15px;
  padding: 2px 10px;
  margin-top: 10px;
  border: 0;
`

export default MyChats

