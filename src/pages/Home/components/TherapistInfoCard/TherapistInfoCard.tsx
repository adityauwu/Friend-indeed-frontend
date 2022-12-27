import styled from 'styled-components';
import { Avatar, Typography, Tag, Rate } from 'antd'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import theme from '../../../../shared/utils/theme';
import { Button } from '../../../../shared/components';
import { CategoryProps } from '../../Home.slice';
import { ROUTES } from '../../../../shared/utils/constants';

export type TherapistInfoCardProps = {
  id: string,
  name: string,
  imageUrl?: string,
  experience?: number,
  rating?: number,
  consultationFee?: number,
  qualification?: string[],
  categories?: any[],
}

function TherapistInfoCard({
  id,
  name,
  imageUrl,
  experience,
  rating,
  qualification,
  consultationFee,
  categories
}: TherapistInfoCardProps) {

  const navigate = useNavigate();

  const cardCategories = categories && categories.length>2
  ? categories.slice(0, 2).map(c => c?.category?.name).concat(`+${categories.length-3} more`)
  : categories?.map(c => c?.category?.name)

  return (
    <Card>
      <PictureDiv>
        {imageUrl
        ? <Avatar size={120} src={imageUrl} />
        : <Avatar size={120}>{name[0]}</Avatar>
        }
      </PictureDiv>
      <InfoDiv>
        <Info>
          <Title ellipsis>Dr. {name}</Title>
          {!!qualification && qualification.map(q => <SubTitle>{q}</SubTitle>)}
          {!!experience && <SubTitle>{`${experience} years of experience`}</SubTitle>}
        </Info>
        {rating && (
          <StyledRate disabled value={rating} />
        )}
      </InfoDiv>
      <CategoriesDiv>
        {cardCategories?.map((name) => (<StyledTag key={name} color='default'>{name}</StyledTag>))}
      </CategoriesDiv>
      <FooterDiv>
        <Fee>
          &#8377; {consultationFee}
          <PerSession>/ Session</PerSession>
        </Fee>
        <Button
          width={45}
          buttonFontSize={11}
          name='Book Now'
          //onClick={() => navigate(`${ROUTES.MY_PROFILE}?userId=${id}`)}
          onClick={() => window.location.href=`${ROUTES.MY_PROFILE}?userId=${id}`}
          
          //onClick={<NavLink>}
        />
      </FooterDiv>
    </Card>
  );
}

export default TherapistInfoCard;

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
  }
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
