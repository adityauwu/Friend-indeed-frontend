import styled from 'styled-components'
import Skeleton from 'react-loading-skeleton'
import { useNavigate } from 'react-router-dom'
import { BackTop, Space, Alert, Row, Col, Typography, Slider } from 'antd'


import {
  HabitProgress,
  FilterBar,
  YourClients
} from './components';
import theme from '../../shared/utils/theme'
import { Button } from '../../shared/components'

import { useAppSelector } from '../../redux/hooks';
import { selectData } from './Home.slice';
import { User } from '../MyProfile/MyProfile.slice';
import { ROUTES, STORAGE_USER_CONSTANT } from '../../shared/utils/constants';
import { useState } from 'react';
import { Love,Fear,Happy,CryingFace } from 'animated-emojis';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';


const Home = () => {

  const state = useAppSelector(selectData);
  const navigate = useNavigate()  
  const categoriesloading = state.status === 'categoriesloading'
  const currentUser = JSON.parse(String(localStorage.getItem(STORAGE_USER_CONSTANT)))
  const userIsTherapist = currentUser.role === User.therapist

  const routeToProfile = () => navigate(`${ROUTES.MY_PROFILE}?userId=${currentUser.id}&edit-profile=true`)
  const isLoading = state.status === 'meetingsloading'
  
  
  interface IconSliderProps {
    max: number;
    min: number;
  }
  
  const IconSlider: React.FC<IconSliderProps> = (props) => {
    const { max, min } = props;
    const [value, setValue] = useState(0);
  
    const mid = Number(((max - min) / 2).toFixed(5));
    const preColorCls = value >= mid ? '' : 'icon-wrapper-active';
    const nextColorCls = value >= mid ? 'icon-wrapper-active' : '';
  
    return (
      <div className="icon-wrapper">
        <FrownOutlined className={preColorCls} />
        <Slider {...props} onChange={setValue} value={value} />
        <SmileOutlined className={nextColorCls} />
      </div>
    );
  };
  
  
  
  
  
  
  const upcomingMeetings = [
    { createdAt:"asdasd",
      meetingLink: "asdasd",
      task: "Meditate for 5 Minutes and do basic Yoga",

    },
    {
      createdAt:"assdsad",
      meetingLink: "asdsad",
      task: "Go Out For A Walk to your park",
    },
    {
      createdAt:"asdsad",
      meetingLink: "asdsad",
      task: "Go to the Gym and Workout for an hour",
    },
    {
      createdAt:"asdsad",
      meetingLink: "asdsad",
      task: "Watch your favourite Tv Show or Movie",
    },
    {
      createdAt:"dasd",
      meetingLink: "asdsad",
      task: "Talk to your parents and best friends about your day",
    },

  ]


  return (
    <>
   

     
        {!userIsTherapist && (
        
         <>
        <Wrapper>
         <HabitProgress />
        </Wrapper>
         <Container>
            Your Mood:
          <CryingFace size={8}/>
          <Typography.Title
            level={4}
            style={{ color: theme.copperBlue }}
          >
            Yours Today's Tasks!
          </Typography.Title>
          {upcomingMeetings.map((meeting: any, i) => (
            <MeetingCard key={`meeting-card-${i}`}>
              <Timeslot>
                <p>
                  To-Do
                </p>
               
              </Timeslot>
              <TitleCard>
                <Title>{meeting.task}</Title>
                <Link href={meeting.meetingLink} target='_blank'>Done</Link>
              </TitleCard>
            </MeetingCard>
            ))
          }
          </Container>


         </>
  
        )
      
        
        }
       
        <Wrapper>
       {userIsTherapist && (
          !currentUser.about
          ||  !currentUser.experience
          ||  !currentUser.consultationFee
          ||  !currentUser.imageUrl
          ||  !currentUser.bookingUrl
          ||  !currentUser.categories
        ) && (
          <>
          <StyledRow justify='center'>
            <Col span={8}>
              <StyledAlert
                closable
                message="Your profile seems incomplete"
                type="warning"
                style={{ borderRadius: 10 }}
                action={
                  <Space>
                    <Button
                      name='Add Missing Details'
                      width={100}
                      buttonFontSize={11}
                      onClick={routeToProfile}
                    />
                  </Space>
                }
              />
            </Col>
          </StyledRow>
        </>
        )}
      </Wrapper>
      
      
      
      {/* <FilterArea>
        {userIsTherapist
        ? <YourClients />
        : categoriesloading
          ? <Skeleton width='80vw' height={100} borderRadius={20} />
          : <FilterBar />
        }
      </FilterArea> */}
      <BackTop />
    </>
  );
};

export default Home;

const Wrapper = styled.div`
  background-color: ${theme.primary};
  align-items:center;
  flex-direction: column:

`;
const SliderDiv = styled.div`
  background-color: ${theme.primary};
  align-items:center;
  width: 40%
  height: 30%;


`;


const UserMood = styled.span`
  background-color: ${theme.brightBlue};
  align-items:center;
  flex-direction: column:


`;

const FilterArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding-top: 30px;
`;

const StyledRow = styled(Row)`
  padding: 30px 0;
`;

const StyledAlert = styled(Alert)`
  border-radius: 10px;


`;

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
  width: 50px;
  height: 30px;
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