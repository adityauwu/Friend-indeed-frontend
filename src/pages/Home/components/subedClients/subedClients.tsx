

import styled from 'styled-components';
import { Avatar, Typography, Tag, Rate } from 'antd'
import { useNavigate } from 'react-router-dom'

import theme from '../../../../shared/utils/theme';
import { Button } from '../../../../shared/components';
import { CategoryProps } from '../../Home.slice';
import { emojiMap, ROUTES } from '../../../../shared/utils/constants';
import { useEffect, useState } from 'react';
import { FollowedFriends, getUserMood, removeFriend } from '../../../../api/MessageRequests';
import { Love,Hate,Fear,Happy,CryingFace}  from 'animated-emojis'

export type FollowedFriends2Props = {
    id: string,
    friendName: string,
    imageUrl?: string,
    email?: string,
    mood: number

    //mood? : string,
  }


interface Props {
    data1: FollowedFriends2Props,
    
 
  }



export default function subedClients(props : Props){
  const {data1} = props;

  const [friendRemoved, setFriendRemoved] = useState(false);
  
  
  
  
  
  
  
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


//   useEffect(()=> {

//     const fetchFriends = async () => {
//       try {
//         const { data } = await FollowedFriends(userId);
       
//         setFriendsInNeed(data.data.data);
//       } catch (error) {
//         console.log(error);
//       }
    
//     };
  
//     fetchFriends() 
//     setFriendRemoved(false);

//   },[friendRemoved])
  
  
  const RemoveFriend= async () =>{

    console.log("inside remove friend");
    try {
      const data = await removeFriend( data1.id);
      console.log("Friend Removed successfully--->"+ data)
      setFriendRemoved(true);
     
    }
    catch
    {
      console.log("error")
    }


    
}
 
 
 
 
//   useEffect(() => {
//     const fetchMood = async () => {
//       try {
//         const {data } = await getUserMood(data1.friendId );
//           if(data.data){
//             setMood(data.data.userMood)

//           }
         
//           return data;
//       } catch (error) {
//         console.log(error);
//       }
    
//     };
    
//     fetchMood()

//   }, [])

    return (
        <Card>
          <PictureDiv>
            {data1.imageUrl
            ? <Avatar size={120} src={data1.imageUrl} />
            : <Avatar size={120}>{data1.friendName[0]}</Avatar>
            }
          </PictureDiv>
          <InfoDiv>
            <Info>
              <Title ellipsis>{data1.friendName}</Title>
              {/* {<SubTitle>{data.email}</SubTitle>} */}
              {/* { <SubTitle>{data.company}</SubTitle>} */}
              {/* {<SubTitle>The users mood is sad</SubTitle>} */}
              
              {/* <Love size={5}></Love> */}

              <Emoji>{AniEmo(data1.mood)}</Emoji> 
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
      );

}




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

const StyledTag = styled(Tag)`
  background-color: ${theme.chip};
  color: ${theme.copperBlue};
  border-radius: 15px;
  padding: 2px 8px;
  border: 0;
`;

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
