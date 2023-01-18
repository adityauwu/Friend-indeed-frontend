import React, { FC, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components'
import { Typography } from 'antd'
import Skeleton from 'react-loading-skeleton'

import { useAppSelector } from '../../../../redux/hooks';
import { fetchUpcomingMeetingsAsync, fetchUpcomingMeetsAsync, selectData } from '../../Home.slice';
import theme from '../../../../shared/utils/theme';
import { User } from '../../../MyProfile/MyProfile.slice';
import AuthContext from '../../../../shared/context/AuthContext';
import { title } from 'process';


const UpcomingMeetings: FC = () => {
  const dispatch = useDispatch()

  const state = useAppSelector(selectData);
  console.log(state)
  const isLoading = state.status === 'meetingsloading'

  const roleMap = {
    [User.patient]: User.therapist.toLowerCase(),
    [User.therapist]: User.patient.toLowerCase()
  }

 // if(!state.upcomingMeetings.length) return null
  
  useEffect(() => {
    dispatch(fetchUpcomingMeetingsAsync())
    dispatch(fetchUpcomingMeetsAsync())

   
  },[])
  console.log("Here is the retrieved object from upcoming meets------>")
  console.log(state?.upcomingMeets)
  return (
    <Container>

      <Typography.Title
        level={4}
        style={{ color: theme.copperBlue }}
      >
        Your upcoming sessions
      </Typography.Title>
      {isLoading? (
        <Skeleton
          width='50vw'
          height={60}
          borderRadius={15}
          count={3}
          baseColor={theme.copperBlue}
        />
      ):
      <>
       { state?.upcomingMeets.map((meeting: any, i) => (
        <MeetingCard key={`meeting-card-${i}`}>
          <Timeslot>
            <p>
              {new Date(meeting.createdAt).toLocaleDateString(undefined, {
                month: 'short',
                day: '2-digit',
              })}
            ::
            {new Date(meeting.createdAt).toLocaleTimeString(undefined, {
                hour: 'numeric',
                minute: '2-digit'
              })}
           </p>
          </Timeslot>
          <TitleCard>
            <Title>Session between Dr.{meeting.therapist.name} and {meeting.patient.name}</Title>
            <Link href={meeting.therapist.googleMeetUrl} target='_blank'>Join Now</Link>
          </TitleCard>
        </MeetingCard>
        ))}

       <MeetingCard key={`meeting-card-45q`}>
          <Timeslot>
            <p>
           
              {new Date().toLocaleDateString(undefined, {
                month: 'short',
                day: '2-digit',
              })}
            ::
            {new Date().toLocaleTimeString(undefined, {
                hour: 'numeric',
                minute: '2-digit'
              })}
           </p>
          </Timeslot>
          <TitleCard>
            <Title>Session between Dr. Vijay Testing and  Test User</Title>
            <Link href={ 'www.google.com'} target='_blank'>Join Now</Link>
          </TitleCard>
        </MeetingCard>

        <MeetingCard key={`meeting-card-34q}`}>
          <Timeslot>
            <p>
             
              {new Date().toLocaleDateString(undefined, {
                month: 'short',
                day: '2-digit',
              })}
            ::
            {new Date().toLocaleTimeString(undefined, {
                hour: 'numeric',
                minute: '2-digit'
              })}
           </p>
          </Timeslot>
          <TitleCard>
            <Title>Session between Dr.Vishaka test and test user 2</Title>
            <Link href={'www.google.com'} target='_blank'>Join Now</Link>
          </TitleCard>
        </MeetingCard>
        </>
      }
    </Container>
  );
}

export default UpcomingMeetings;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
`;

const MeetingCard = styled.div`
  background-color: ${theme.copperBlue};
  height: 60px;
  width: 50%;
  border-radius: 15px;
  padding: 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  font-style: italic;
  transition: all 0.2s ease;
  cursor: default;

  &:hover {
    width: 55%;
  }

  @media (max-width: 450px) {
    width: 90%;
    font-size: 14px;

    &:hover {
      width: 95%;
    }
  }

  @media (min-width:451px and max-width: 769px) {
    width: 80%;

    &:hover {
      width: 75%;
    }
  }
`;

const Timeslot = styled.div`
  width: 90px;
  height: 50px;
  background-color: white;
  border-radius: 12px;
  text-align: center;
  
  color: ${theme.copperBlue};
`;

const TitleCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px;

  @media (max-width: 450px) {
    pading: 0 5px;
  }
`;

const Title = styled.p`
  color: white;
  font-style: 'italic';
  font-size: 18;
  letter-spacing: 0.2;
`;

const Link = styled(Typography.Link)`
  text-decoration: underline;
`;