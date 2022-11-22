import React, { useState } from "react"
import styled from "styled-components"
import { Row, Avatar, Typography, Tag } from "antd"
import { ClockCircleOutlined, CalendarOutlined } from "@ant-design/icons"

import Menu from "../../containers/Menu";
import ChatRoom from "../../containers/ChatRoom";
import "./styles.scss";
function MyChats() {
  const [selectedChat, setSelectedChat] = useState({ "name": "first", "id": "12","groupName":"a" });

  const sessions = [
    {
      date: "25 Jan",
      time: "04: 00pm",
      title: "Session between Lakshitha & Dr.Khanchandani",
      categories: ["Depression", "Hypertension"],
      imageUrl: "https://post.healthline.com/wp-content/uploads/2019/10/Female_Therapist_732x549-thumbnail.jpg",
      meetingLink: "https://meet.google.com/zwb-koam-dgs",
    },
    {
      date: "04 Feb",
      time: "01: 00pm",
      title: "Session between Lakshitha & Dr.Mohini",
      categories: ["Anxiety", "Hypertension"],
      imageUrl: "https://post.healthline.com/wp-content/uploads/2019/10/Female_Therapist_732x549-thumbnail.jpg",
      meetingLink: "https://meet.google.com/zwb-koam-dgs",
    },
    {
      date: "16 Feb",
      time: "05: 00pm",
      title: "Session between Lakshitha & Dr.Parag",
      categories: ["Bipolar disorder"],
      imageUrl:
        "https://post.healthline.com/wp-content/uploads/2019/10/Female_Therapist_732x549-thumbnail.jpg",
      meetingLink: "https://meet.google.com/zwb-koam-dgs",
    },
  ]
  return (

    <Container>
      {1 && (
        <AppContainer>
          <MenuCard>
            <Menu
              user={{}}
              contacts={{}}
              conversations={{}}
              handleSelectChat={{}}
              handleRemoveContact={{}}
              handleAddContact={{}}
              handleUpdateContact={{}}
            />
          </MenuCard>
          <div className="app-container__content">


            {selectedChat ? (
              <>
                <ChatRoom
                  user={{}}
                  contacts={{} }
                  selectedChat={selectedChat}
                  handleSelectChat={{} }
                />
              </>
            ) : (
              <div
                style={{
                  height: "100%",
                  width: "100%",
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
 
  flex: 40%;
  min-width: 210px;
  position: relative;
  z-index: 100;
  overflow: hidden;
  border-right: 1px solid #cccccc;

  `
const AppContainer = styled.div`
  top: 0;
  position: relative;
  height:100%;
  display: flex;
  width: 100%;
  overflow: hidden;
  border: 1px solid black;
`
const StyledTag = styled(Tag)`
  border-radius: 15px;
  padding: 2px 10px;
  margin-top: 10px;
  border: 0;
`

export default MyChats

