import styled from 'styled-components';
import { Avatar, Typography, Tag, Rate } from 'antd'
import { useNavigate } from 'react-router-dom'

import theme from '../../../../shared/utils/theme';
import { Button } from '../../../../shared/components';
import { CategoryProps } from '../../Home.slice';
import { ROUTES } from '../../../../shared/utils/constants';




export type FriendInfoCardProps = {
  id: string,
  name: string,
  imageUrl?: string,
  experience?: number,
  rating?: number,
  consultationFee?: number,
  qualification?: string[],
  categories?: any[],
  email?: string,
  company? : string,
  mood? : string,

}


interface Props {
  data: FriendInfoCardProps,
  text?: string;
  setFriendsInNeed? :any;
  localfriends? : any;
 
}


export default function FriendInfoCard(props: Props) {
  const { data, text,setFriendsInNeed,localfriends} = props; 
  
  const navigate = useNavigate();

  const addFriend = () => {
    localfriends.push({
      id: data.id,
      email: data.email,
      imageUrl: "https://picsum.photos/id/299/200/300",
      

    })

    setFriendsInNeed(localfriends);
  }

  const cardCategories = data.categories && data.categories.length>2
  ? data.categories.slice(0, 2).map(c => c?.category?.name).concat(`+${data.categories.length-3} more`)
  : data.categories?.map(c => c?.category?.name)

  return (
    <Card>
      <PictureDiv>
        {data.imageUrl
        ? <Avatar size={120} src={data.imageUrl} />
        : <Avatar size={120}>{data.name[0]}</Avatar>
        }
      </PictureDiv>
      <InfoDiv>
        <Info>
          <Title ellipsis>{data.name}</Title>
          {<SubTitle>{data.email}</SubTitle>}
          { <SubTitle> Organization :<Fee>{data.company}</Fee></SubTitle>}
      
         
        </Info>
        
      </InfoDiv>
      {/* <CategoriesDiv>
        {cardCategories?.map((name) => (<StyledTag key={name} color='default'>{name}</StyledTag>))}
        
      </CategoriesDiv> */}
      <FooterDiv>
        <Fee>
            Follow User
          
        </Fee>
        <Button
          width={45}
          buttonFontSize={11}
          name='Follow'
          onClick={() => addFriend()}
        />
      </FooterDiv>
    </Card>
  );

}



// function FriendInfoCarrd({
//   id,
//   name,
//   imageUrl,
//   experience,
//   rating,
//   qualification,
//   consultationFee,
//   categories,
//   email,
//   company,
//   mood

// }: FriendInfoCardProps) {

//   const navigate = useNavigate();

//   const cardCategories = categories && categories.length>2
//   ? categories.slice(0, 2).map(c => c?.category?.name).concat(`+${categories.length-3} more`)
//   : categories?.map(c => c?.category?.name)

//   return (
//     <Card>
//       <PictureDiv>
//         {imageUrl
//         ? <Avatar size={120} src={imageUrl} />
//         : <Avatar size={120}>{name[0]}</Avatar>
//         }
//       </PictureDiv>
//       <InfoDiv>
//         <Info>
//           <Title ellipsis>{name}</Title>
//           {<SubTitle>{email}</SubTitle>}
//           { <SubTitle>{company}</SubTitle>}
//           {<SubTitle>The users mood is sad</SubTitle>}
//         </Info>
//         <Emoji> asdsadasd</Emoji>
//       </InfoDiv>
//       {/* <CategoriesDiv>
//         {cardCategories?.map((name) => (<StyledTag key={name} color='default'>{name}</StyledTag>))}
        
//       </CategoriesDiv> */}
//       <FooterDiv>
//         <Fee>
//           &#8377; {consultationFee}
//           <PerSession>UnFollow</PerSession>
//         </Fee>
//         <Button
//           width={45}
//           buttonFontSize={11}
//           name='Check Profile'
//           onClick={() => navigate(`${ROUTES.MY_PROFILE}?userId=${id}`)}
//         />
//       </FooterDiv>
//     </Card>
//   );
// }

//export default FriendInfoCard;

const Card = styled.div`  
  border-radius: 15px;
  background-color: ${theme.lightblue};
  width: 250px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 15px;
  margin: 0;
  transition: all 0.5s ease;

  &:hover {
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    background-color : #DEECFA;    
  }
`;
const Emoji = styled.span`  
 
  font-size : 50px;
 
  
  align-items: center;
  

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
  align-items: flex-start;
  justify-content: space-between;
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
  width: 65%;
`;

const Title = styled(Typography.Text)`
  font-size: 16px;
  text-wrap: wrap;
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
  color: ${theme.copperBlue};
`;

const PerSession = styled(Typography.Text)`
  color: ${theme.secondaryText};
`;
