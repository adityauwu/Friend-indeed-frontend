import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components'
import { Row, Col, Select, Input, Typography, Empty, Divider, List, Spin } from 'antd'
import { Button } from '../../shared/components';
import { SearchOutlined, FilterFilled } from '@ant-design/icons'
import { debounce } from 'lodash'
import InfiniteScroll from 'react-infinite-scroll-component'
import theme from '../../shared/utils/theme';

const currentUser = JSON.parse(String(localStorage.getItem(STORAGE_USER_CONSTANT)))



import {
  CategoryProps,
  selectData,
  setFilters,
  fetchCategoriesAsync,
  fetchTherapistsAsync,
  incrementPage,
  setPatientFilters,
  fetchPatientToFollowAsync
} from '../Home/Home.slice';

import TherapistInfoCard, { TherapistInfoCardProps } from '../Home/components/TherapistInfoCard/TherapistInfoCard'; 

import FriendInfoCard, { FriendInfoCardProps } from '../Home/components/FriendInNeedCard/FriendInNeedCard';
import FollowedFriendsCard,{FollowedFriendsProps} from '../Home/components/FollowedFriendsCard/FollowedFriendsCard';

import { useAppSelector } from '../../redux/hooks';
import { experiencesOptions, feesOptions, ratingsOptions, STORAGE_USER_CONSTANT } from '../../shared/utils/constants';
import { FollowedFriends } from '../../api/MessageRequests';


function FilterBar() {

  const dispatch = useDispatch()
  const state = useAppSelector(selectData)
  const { Option } = Select
  const therapistsLoading = state.status === 'therapistsloading'

  const [category, setCategory] = useState<any>('');
  const [rating, setRating] = useState<any>('');
  const [fee, setFee] = useState<any>('');
  const [experience, setExperience] = useState<any>('');
  const [username, setUserName] = useState<any>('');
  const [email , setEmail] = useState<any>('');
  const [friendsinneed, setFriendsInNeed] = useState<any>([]);
  const handleSearch = useCallback(
    debounce(query => dispatch(fetchTherapistsAsync({ name: query, page: 1 })), 500),
    []
  );

  useEffect(() => {
    dispatch(fetchCategoriesAsync())
    //setFriendsInNeed(localfriends)

    const fetchFriends = async () => {
      try {
        const { data } = await FollowedFriends(currentUser.id);
       
        setFriendsInNeed(data.data.data);
      } catch (error) {
        console.log(error);
      }
    
    };
  
    fetchFriends()

    return () => {
      handleSearch.cancel()
    }
  }, [])

  useEffect(() => {
    dispatch(fetchPatientToFollowAsync(state.patientFilters))
  }, [state.patientFilters])

  const localfriends=[
    {
      id : "1",
      email : "abc@gmail.com",
      friendName: "Aditya Aggarwal",
      imageUrl : "https://picsum.photos/id/237/200/300",
      mood : "sad"

    },
    {
      id : "2",
      email : "xyz@gmail.com",
      friendName: "Sanyam Bharani",
      imageUrl : "https://picsum.photos/id/267/200/300",
      mood : "happy"


    },
    {
      id : "3",
      email : "testing123@gmail.com",
      friendName: "Sonal Balayan",
      imageUrl : "https://picsum.photos/id/299/200/300",
      mood : "average"

    }
  ]

  const AddFriend =async (data: FriendInfoCardProps)=>{
    try {
      const { data } = await FollowedFriends(currentUser.id);
     
      setFriendsInNeed(data.data.data);
    } catch (error) {
      console.log(error);
    }


  }

  // const RemoveFriend = (data: FollowedFriendsProps)=>{


  // }
  
  
  return (
    <Container>
        
       <Wrapper><Title>Friends That You Follow</Title></Wrapper>
        <Wrapper>
      
        
        <FriendsContainer>
        <List
            grid={{
              gutter: 24,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 3
            }}
            style={{ flexWrap: 'wrap' }}
            dataSource={friendsinneed as any}
           
            renderItem={(info: FollowedFriendsProps) => (
              <List.Item key={info.id} style={{ display: 'flex', justifyContent: 'center' }}>
                <FollowedFriendsCard  
                   data1={info}
                   setFriendsInNeed ={setFriendsInNeed}
                   userId = {currentUser.id}

                   
                    />
              </List.Item>
            )}
          />
       </FriendsContainer>
        </Wrapper>
        <Title>Search For Friends</Title>
        <FilterContainer>
        <StyledRow gutter={[16, 24]}>
          {/* <Col xs={12} md={5} lg={6}>
            <StyledSelect
              placeholder='Issue'
              onChange={value => setCategory(value)}
            >
              {state.categories.map(({ name }) => (
                <Option value={name}>
                  <T>{name}</T>
                </Option>
              ))}
            </StyledSelect>
          </Col> */}
          {/* <Col xs={12} md={5} lg={6}>
            <StyledSelect
              placeholder='Rating'
              onChange={value => setRating(value)}
              style={{ borderRadius: 5 }}
            >
              {ratingsOptions.map(({ label, value }) => (
                <Option value={value}>
                  <T>{label}</T>
                </Option>
              ))}
            </StyledSelect>
          </Col> */}
          {/* <Col xs={12} md={5} lg={6}>
            <StyledSelect
              placeholder='Enter Name'
              onChange={value => setExperience(value)}
            >
              {experiencesOptions.map(({ label, value }) => (
                <Option value={value}>
                  <T>{label}</T>
                </Option>
              ))}
            </StyledSelect>
          </Col> */}
          <Col xs={24} lg={15}>
            <Input
              allowClear
              onChange={e => setUserName(e.target.value)}
              placeholder='Search Friends by name...'
              suffix={<SearchIcon />}
            />
          </Col>
          {/* <Col xs={12} md={5} lg={6}>
            <StyledSelect
              placeholder='Consultation Fee'
              onChange={value => setFee(value)}
            >
              {feesOptions.map(({ label, value }) => (
                <Option value={value}>
                  <T>{label}</T>
                </Option>
              ))}
            </StyledSelect>
          </Col> */}
        </StyledRow>
        <StyledRow gutter={[16, 24]}>
          <Col xs={24} lg={15}>
            <Input
              allowClear
              onChange={e => setEmail(e.target.value)}
              placeholder='Search Friends by email...'
              suffix={<SearchIcon />}
            />
          </Col>
          <Col xs={24} lg={6}>
            <Button
             width={100}
             icon={<FilterIcon />}
              name='Search For Friends'
              onClick={() => dispatch(setPatientFilters({
                username,
                email,
                page: 1
                
              }
            ))
            
            }
            />
          </Col>
        </StyledRow>
      </FilterContainer>
      <TherapistGrid id="scrollableDiv">
        <InfiniteScroll
          style={{ overflow: 'hidden' }}
          dataLength={state.dataCount}
          next={() => {
             dispatch(fetchPatientToFollowAsync({ page: state.filters.page+1 }))
            // dispatch(fetchPatientToFollowAsync(state.patientFilters))
           
            dispatch(incrementPage())
          }}
          hasMore={state.data?.length < state.dataCount}
          loader={<Spin />}
          endMessage={<Divider plain>End of list 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            grid={{
              gutter: 24,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 3
            }}
            style={{ flexWrap: 'wrap' }}
            dataSource={state.patientsToFollow}
            loading={therapistsLoading}
            renderItem={(info: FriendInfoCardProps) => (
              <List.Item key={info.id} style={{ display: 'flex', justifyContent: 'center' }}>
                <FriendInfoCard 
                  data={info}
                  text = {"adasdsad"}
                  setFriendsInNeed = {setFriendsInNeed}
                  localfriends ={localfriends}
                  AddFriend = { AddFriend}
                  userId = {currentUser.id}
                  
                />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </TherapistGrid>
    </Container>
  );
}

export default FilterBar;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  
`;

const Wrapper = styled.div`
  
background-color: ${theme.primary};
display: flex;
align-items : center;
  
`;


const FriendsContainer = styled.div`
  width: 80%;
 
  margin: 20px 0;
  padding: 5px;
  margin: 0 auto;
 
  background-color: ${theme.primary};
  
`;


const FilterContainer = styled.div`
  width: 80%;
  border-radius: 15px;
  margin: 20px 0;
  padding: 5px;
  background-color: rgba(7, 48, 66, 0.2);
  margin: 0 auto;
  font-family: DM Sans;
  font-weight: medium;
`;

const StyledRow = styled(Row)`
  display: flex;
  justify-content: space-between;
  padding: 0 70px;
  margin: 20px 0;

  @media (max-width: 950px) {
    padding: 0 10px;
  }
`;

const StyledSelect = styled(Select)`
  width: 100%;
  font-family: DM Sans;
`;

const T = styled(Typography.Text)`
  color: ${theme.copperBlue};
  text-align: center;
`;

const SearchIcon = styled(SearchOutlined)`
  color: ${theme.secondaryText}
`;

const FilterIcon = styled(FilterFilled)`
  color: ${theme.neonGreen}
`;

const TherapistGrid = styled.div`
  width: 80%;
  margin : 25px 5px;
  margin: 0 auto;
  padding: 5px;

 
  align-items : center;
  justify-content: center;

  @media (max-width: 450px) {
    width: 90%;
  }

`;

const Title = styled(Typography.Text)`
  font-size: 32px;
  text-wrap: wrap;
  margin: 0 auto;
  
  font-family: DM Sans;
  font-weight: medium;
`;

const FriendsGrid = styled.div`
  width: 80%;
  margin: 50px 0;

  @media (max-width: 450px) {
    width: 90%;
  }

`;



const StyledCol = styled(Col)`
  display: flex;
  justify-content: center;
`;

const LoaderDiv = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
  align-items: center;
`;

const StyledEmpty = styled(Empty)`
  height: 300px;
  width: 100%;
`;