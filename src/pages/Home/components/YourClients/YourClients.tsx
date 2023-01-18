import { useCallback, useState, useEffect, FC } from "react"
import styled from "styled-components"
import Skeleton from "react-loading-skeleton"
import { Typography, Input, Image, Tag, Avatar, List, Rate } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import { debounce } from "lodash"

import theme from "../../../../shared/utils/theme"
import { Button } from "../../../../shared/components"
import { useAppSelector } from "../../../../redux/hooks"
import { fetchPatients2Async, fetchPatientsAsync, Patient, selectData } from "../../Home.slice"
import { useDispatch } from "react-redux"
import { Modal} from 'antd';
import { STORAGE_USER_CONSTANT } from "../../../../shared/utils/constants"
import FriendInfoCard from "../FriendInNeedCard"
import subedClients from "../subedClients"
import { CryingFace, Fear, Happy, Hate } from "animated-emojis"


type PatientCardProps = {
  id: string
  name: string
  imageUrl: string
  date: string
  categories: any[]
}
  const currentUser = JSON.parse(String(localStorage.getItem(STORAGE_USER_CONSTANT)))
const PatientCard: FC<PatientCardProps> = ({ name, imageUrl, date, categories }: PatientCardProps) => {
  

 

  const [visible, setVisible] = useState(false);

  return (
    <PatientCardContainer>
      <Picture src={imageUrl} />
      <InfoArea>
        <Typography.Title level={5}>{name}</Typography.Title>
        <p>{`Last session: ${date}`}</p>
        <>
          {categories.map((name) => (
            <StyledTag key={name} color="default">
              {name}
            </StyledTag>
          ))}
        </>
      </InfoArea>
      <ActionsArea>
        <Button
          name="View Past Sessions"
          onClick={() => null}
          width={100}
          height={30}
          buttonFontSize={12}
        />
        <Button
          name="Prescribe Treatment"
          onClick={() => setVisible(true)}
          width={100}
          height={30}
          buttonFontSize={12}
        />
        <Modal
          title="Prescribe Treatment"
          centered
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          width={700}
        >
          <PatientCardContainer>
          <Avatar src={imageUrl} size={50} />
          <InfoArea>
          <Typography.Title level={5}>Session with {name}</Typography.Title>
          </InfoArea>
          </PatientCardContainer>
          <p>some contents...</p>
          <p>some contents...</p>
        </Modal>
      </ActionsArea>
    </PatientCardContainer>
  )
}

function YourClients() {
  const dispatch = useDispatch()
  const state = useAppSelector(selectData)
  const isLoading = state.status === "patientsLoading"

  const MockPatients = [
    {
      id: "123",
    friendName: "Manmohan testing",
    imageUrl: "https://picsum.photos/id/237/200/300",
    email: "testingManmohan@gmail.com",
    mood : 5,
   
    },
    {
      id: "234",
    friendName: "test user 2",
    imageUrl: "https://picsum.photos/id/247/200/300",
    email: "testuser2@gmail.com",
    mood : 4,
   
    },
    {
      id: "345",
    friendName: "test user 3",
    imageUrl: "https://picsum.photos/id/277/200/300",
    email: "testuser3@gmail.com",
    mood: 3,
    
    },
    {
      id: "456",
    friendName: "test user 4",
    imageUrl: "https://picsum.photos/id/257/200/300",
    email: "testuser4@gmail.com",
    },
    {
      id: "567",
    friendName: "test user 5",
    imageUrl: "https://picsum.photos/id/287/200/300",
    email: "testuser5@gmail.com",
   
  

    }
  ]

  const AniEmo =(num : number)=>{
    console.log(num)
    if(num===5){
      return <CryingFace size={5}/>

    }
    else if(num===4){
      return <Fear size={5}/>
    }
    else if(num===3){
      return <Hate size={5}/>
    }
    else {
      return <Happy size={5}/>
    }
  }


  const [name, setName] = useState("")

  const handleSearch = useCallback(
    debounce((query) => dispatch(fetchPatientsAsync(query)), 400),
    []
  )

  useEffect(() => {
    console.log("inside useeffect--->")

    // fetchPatients2Async(currentUser);
    fetchPatientsAsync(currentUser)
    console.log("after fetching patients 2")
  }, [])

    console.log(state)
  return (
    <Container>
      <Typography.Title
        level={3}
        style={{ color: theme.copperBlue, marginBottom: 20 }}
      >
        Your Clients
      </Typography.Title>
      <SearchBar
        allowClear
        onChange={e => handleSearch(e.target.value)}
        placeholder={`I'm looking for...`}
        suffix={<SearchOutlined />}
      />
      {isLoading
      ? (
        Array(3).fill(0).map((_, i) => (
          <Skeleton
            key={`loader-${i}`}
            width='60vw'
            height={120}
            borderRadius={20}
            style={{ marginBottom: 20 }}
          />
        ))
      ) 
      : (
        // <List
        //   dataSource={MockPatients}
        //   rowKey={p => p.id}
        //   renderItem={(user: any) => (
        //     <List.Item>

        //   <Card>
        //   <PictureDiv>
        //     {user.imageUrl
        //     ? <Avatar size={120} src={user.imageUrl} />
        //     : <Avatar size={120}>{user.friendName}</Avatar>
        //     }
        //   </PictureDiv>
        //   <InfoDiv>
        //     <Info>
        //       <Title ellipsis>{user.friendName}</Title>
        //       {/* {<SubTitle>{data.email}</SubTitle>} */}
        //       {/* { <SubTitle>{data.company}</SubTitle>} */}
        //       {/* {<SubTitle>The users mood is sad</SubTitle>} */}
              
        //       {/* <Love size={5}></Love> */}

        //       <Emoji>{AniEmo(user.mood)}</Emoji> 
        //     </Info>
            
        //   </InfoDiv>
        //   {/* <CategoriesDiv>
        //     {cardCategories?.map((name) => (<StyledTag key={name} color='default'>{name}</StyledTag>))}
            
        //   </CategoriesDiv> */}
        //   <FooterDiv>
            
        //    <StyledBtn
        //       onClick={() => null}
        //       >View Profile</StyledBtn>
        //     {/* <Button
        //       width={45}
        //       buttonFontSize={8}
        //       name='UnFollow'
        //       //onClick={}
        //     /> */}
        //   </FooterDiv>
        // </Card>
            
        //  </List.Item>





        //   )}
        // />


        <List
        grid={{
          gutter: 24,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 3
        }}
        style={{ flexWrap: 'wrap' }}
        dataSource={MockPatients}
          rowKey={p => p.id}
        renderItem={(user: any) => (
          <List.Item>

        <Card>
        <PictureDiv>
          {user.imageUrl
          ? <Avatar size={120} src={user.imageUrl} />
          : <Avatar size={120}>{user.friendName}</Avatar>
          }
        </PictureDiv>
        <InfoDiv>
          <Info>
            <Title ellipsis>{user.friendName}</Title>
            {/* {<SubTitle>{data.email}</SubTitle>} */}
            {/* { <SubTitle>{data.company}</SubTitle>} */}
            {/* {<SubTitle>The users mood is sad</SubTitle>} */}
            
            {/* <Love size={5}></Love> */}

            <Emoji>{AniEmo(user.mood)}</Emoji> 
          </Info>
          
        </InfoDiv>
        {/* <CategoriesDiv>
          {cardCategories?.map((name) => (<StyledTag key={name} color='default'>{name}</StyledTag>))}
          
        </CategoriesDiv> */}
        <FooterDiv>
          
         <StyledBtn
            onClick={() => null}
            >View Profile</StyledBtn>
          {/* <Button
            width={45}
            buttonFontSize={8}
            name='UnFollow'
            //onClick={}
          /> */}
        </FooterDiv>
      </Card>
          
       </List.Item>





        )}
      />





      )}
      {/* : state.patients.map((user: Patient) => (
        <PatientCard key={`user-${user.name}}`} {...user} />
      ))} */}
    </Container>
  )
}

export default YourClients

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 30px;
  width: 100%;
  min-height: 60vh;
`;

const SearchBar = styled(Input)`
  border-radius: 20px;
  background-opacity: 0.2;
  width: 50vw;
  height: 100%;
  font-family: DM Sans;
  margin-bottom: 20px;
`

const PatientCardContainer = styled.div`
  width: 60%;
  height: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 20px;
  background-color: ${theme.lightblue};
  display: flex;
  align-items: center;
`

const Picture = styled(Image)<{ src: string }>`
  width: 110px;
  height: 110px;
  border-radius: 20px;
  background: ${theme.lightblue} url("${(props) => props.src}") no-repeat fixed
    center;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.3);
  margin-right: 20px;

  $:hover {
    opacity: 0.9;
  }
`

const InfoArea = styled.div`
  disply: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  width: 70%;
`

const StyledTag = styled(Tag)`
  background-color: ${theme.chip};
  color: ${theme.copperBlue};
  border-radius: 15px;
  padding: 2px 10px;
  margin-top: 10px;
  border: 0;
`

const ActionsArea = styled.div`
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`





const Card = styled.div`  
  border-radius: 15px;
  background-color: ${theme.lightblue};
  width: 250px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  margin: 0;
  transition: all 0.5s ease;

  &:hover {
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    background-color : #DEECFA;    
  }
`;
const Emoji = styled.div`  
 
  font-size : 70px;
  

`;

const PictureDiv = styled.div`
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;

const InfoDiv = styled.div`
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CategoriesDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

// const StyledTag = styled(Tag)`
//   background-color: ${theme.chip};
//   color: ${theme.copperBlue};
//   border-radius: 15px;
//   padding: 2px 8px;
//   border: 0;
// `;

const FooterDiv = styled.div`
  height: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 5px;
`;

const Title = styled(Typography.Text)`
  font-size: 16px;
  text-wrap: wrap;
  margin-top: 35px;
  font-weight: bold;
`;

const SubTitle = styled(Typography.Text)`
  font-size: 12px;
  color: ${theme.secondaryText};
`;

const StyledRate = styled(Rate)`
  font-size: 12px;
  margin-left: 5px;
  width: 35%;
`;

const Fee = styled(Typography.Text)`
  font-size: 13px;
  color: ${theme.neonGreen};
  margin-top: 40px;

`;

const PerSession = styled(Typography.Text)`
  color: ${theme.secondaryText};
`;

const StyledBtn = styled.button`
  background: ${theme.copperBlue};
  border: 0;
  border-radius: 50px;
  height: 40px
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${theme.neonGreen};
  text-size:30px;
  margin-left: 170px;
  margin-top: 35px;


  &:hover {
    background-color: rgba(7, 48, 66, 0.6);
    border: 0;
  }

`;
