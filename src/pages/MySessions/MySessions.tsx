import React, { FC, useEffect } from "react"
import styled from "styled-components"
import { Row, Avatar, Typography, Tag, Alert } from "antd"
import Skeleton from 'react-loading-skeleton'
import { ClockCircleOutlined, CalendarOutlined } from "@ant-design/icons"
import PageHeader from "../../shared/components/PageHeader"
import theme from "../../shared/utils/theme"
import { FilterBar, UpcomingMeetings, YourClients } from "../Home/components"
import { useAppSelector } from "../../redux/hooks"

import {  selectData } from '../Home/Home.slice';
import { User } from '../MyProfile/MyProfile.slice';
import { ROUTES, STORAGE_USER_CONSTANT } from '../../shared/utils/constants';
import { useDispatch } from "react-redux"






// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 30px 0;
// `;

// const MeetingCard = styled.div`
//   background-color: ${theme.copperBlue};
//   height: 60px;
//   width: 50%;
//   border-radius: 15px;
//   padding: 5px;
//   margin-bottom: 5px;
//   display: flex;
//   align-items: center;
//   font-style: italic;
//   transition: all 0.2s ease;
//   cursor: default;

//   &:hover {
//     width: 55%;
//   }

//   @media (max-width: 450px) {
//     width: 90%;
//     font-size: 14px;

//     &:hover {
//       width: 95%;
//     }
//   }

//   @media (min-width:451px and max-width: 769px) {
//     width: 80%;

//     &:hover {
//       width: 75%;
//     }
//   }
// `;

// const Timeslot = styled.div`
//   width: 90px;
//   height: 50px;
//   background-color: white;
//   border-radius: 12px;
//   text-align: center;
//   color: ${theme.copperBlue};
// `;

// const TitleCard = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   width: 100%;
//   padding: 0 20px;

//   @media (max-width: 450px) {
//     pading: 0 5px;
//   }
// `;

// const Title = styled.p`
//   color: white;
//   font-style: 'italic';
//   font-size: 18;
//   letter-spacing: 0.2;
// `;

// const Link = styled(Typography.Link)`
//   text-decoration: underline;
// `;





function MySessions() {
  const state = useAppSelector(selectData);
  const currentUser = JSON.parse(String(localStorage.getItem(STORAGE_USER_CONSTANT)))
  const userIsTherapist = currentUser.role === User.therapist
  const categoriesloading = state.status === 'categoriesloading'
  const sessions = [
    {
      date: "25 Jan",
      time: "04: 00pm",
      title: "Session between Lakshitha & Dr.Khanchandani",
      categories: ["Depression","Hypertension"],
      imageUrl: "https://post.healthline.com/wp-content/uploads/2019/10/Female_Therapist_732x549-thumbnail.jpg",
      meetingLink: "https://meet.google.com/zwb-koam-dgs",
    },
    {
      date: "04 Feb",
      time: "01: 00pm",
      title: "Session between Lakshitha & Dr.Mohini",
      categories: ["Anxiety","Hypertension"],
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
      <UpcomingMeetings/>
      {/* <PageHeader title="My Sessions" /> */}
    
      {/* <StyledRow>
        {sessions.map((session) => (
          <SessionCard>
            <Avatar src={session.imageUrl} size={50} />
            <InfoArea>
              <Typography.Title level={5}>{session.title}</Typography.Title>
              <p>{`Last session: ${session.date}`}</p>
              <>
                {session.categories.map((name) => (
                  <StyledTag key={name} color="default">
                    {name}
                  </StyledTag>
                ))}
              </>
            </InfoArea>
          </SessionCard>
        ))}
      </StyledRow>
         */}
        
        
        <FilterArea>
      {userIsTherapist
      ? <YourClients />
      : categoriesloading
        ? <Skeleton width='80vw' height={100} borderRadius={20} />
        : <FilterBar />
      }
        
      </FilterArea>
      
    </Container>





  )
}

export default MySessions

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const StyledRow = styled(Row)`
  background-color: white;
  padding: 50px 0;
  display: flex;
  justify-content: center;
`

const SessionCard = styled.div`
  display: flex;
  width: 60%;
  height: 100%;
  padding: 10px 15px;
  border-radius: 20px;
  margin-bottom: 20px;
  background-color: ${theme.primary};
`
const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  width: 70%;
  padding: 10px;
`
const StyledTag = styled(Tag)`
  background-color: ${theme.chip};
  color: ${theme.copperBlue};
  border-radius: 15px;
  padding: 2px 10px;
  margin-top: 10px;
  border: 0;
`


const Wrapper = styled.div`
background-color: ${theme.primary};
`;

const FilterArea = styled.div`
display: flex;
flex-direction: column;
align-items: center;
background-color: white;
padding-top: 30px;
`;


const StyledAlert = styled(Alert)`
border-radius: 10px;
`;
