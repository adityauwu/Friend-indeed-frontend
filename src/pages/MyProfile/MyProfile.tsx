import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import { CalendlyEventListener, DateAndTimeSelectedEvent, PopupButton } from 'react-calendly'
import {
  Row, Col, Image, Typography, List, Comment, Rate,
  Popconfirm, Skeleton as AntSkeleton, Upload, Tag
} from 'antd'
import { UploadOutlined, EditFilled } from '@ant-design/icons'

import PageHeader from '../../shared/components/PageHeader';
import { DEFAULT_PROFILE_URL, STORAGE_USER_CONSTANT } from '../../shared/utils/constants';
import { Button } from '../../shared/components';
import theme from '../../shared/utils/theme';
import { useAppSelector } from '../../redux/hooks';
import { completePaymentAsync, fetchPatientProfileAsync, fetchTherapistProfileAsync, initiatePaymentAsync, selectData, uploadPhotoAsync, User } from './MyProfile.slice';
import { useDispatch } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { EditProfile, Feedback } from './components';
import { deleteFeedback, getFeedback } from '../../api/MessageRequests';

function MyProfile() {

  const modalStyles = {
    okButtonProps: { style: { fontFamily: 'DM Sans', borderRadius: '20px' } },
    cancelButtonProps: { style: { fontFamily: 'DM Sans', borderRadius: '20px' } }
  }

  const dispatch = useDispatch()
  const { data, order, status } = useAppSelector(selectData)
  const currentUser = JSON.parse(String(localStorage.getItem(STORAGE_USER_CONSTANT)))
  const loading = ['therapistProfileLoading', 'patientProfileLoading'].includes(status)
  const userIsTherapist: boolean = currentUser.role === User.therapist
  const urlParams = useSearchParams()
  const therapistId: string | null = urlParams[0].get('userId')
  const editProfile = Boolean(urlParams[0].get('edit-profile'))
  const patientViewsTherapist: boolean = !!therapistId && !userIsTherapist
  const patientViewsSelf: boolean = !therapistId && !userIsTherapist
  const therapistViewsSelf: boolean = !therapistId && userIsTherapist

  const [openFeedbackModal, setOpenFeedbackModal] = useState(false)

  const [openEditForm, setOpenEditForm] = useState(false || editProfile)
  const [newFeedbackAdded, setNewFAdded] = useState(false);
  const [feedbacks , setFeedbacks] = useState([{} as any])

  const openModal = () => setOpenFeedbackModal(true)
  const closeModal = () => setOpenFeedbackModal(false)
  const closeDrawer = () => setOpenEditForm(false)

  function loadScript(src: string) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    dispatch(initiatePaymentAsync({
      patientId: currentUser.id,
      therapistId: String(data?.id),
      amount: Number(data?.consultationFee)
    }))

    if (!order) {
      alert("Server error. Are you online?");
      return;
    }

    const options = {
        key: "13g04gTO94pn21rqQBjNb7mn", // Enter the Key ID generated from the Dashboard
        amount: (order?.fees * 100).toString(),
        currency: 'INR',
        name: "Friend Indeed",
        description: `Book your session @ ${order?.fees}`,
        order_id: order?.orderId,
        handler: async function (response: any) {
            const data = {
                orderCreationId: order?.orderId,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
            };

            dispatch(completePaymentAsync(data))
        },
        prefill: {
          name: currentUser.name,
          email: currentUser.email,
        },
        theme: {
          color: currentUser.primary,
        },
    };
    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
}

const deleteFeedbackfn =async (id: any)=>{
  try{
    const data =  await deleteFeedback(id);
    console.log(data);
    setNewFAdded(true);
  
  }
catch(err){
  console.log(err);
}


}

  useEffect(() => {
    if(patientViewsTherapist || editProfile){
      dispatch(fetchTherapistProfileAsync(String(therapistId)))
     
    } else if (therapistViewsSelf) {
      console.log("here")
      dispatch(fetchTherapistProfileAsync(String(currentUser.id)))
      //  console.log(data?.feedback)
      // if(data?.feedback){
      // //console.log(data?.feedback)
      // setFeedbacks(data?.feedback)
      // }
    
    } else {
      dispatch(fetchPatientProfileAsync(currentUser.id))
    }
    
    setNewFAdded(true);
  }, [userIsTherapist, therapistId, editProfile])

  useEffect(()=>{
    const addfeed =async (id: any)=>{
      try{
        const data = await getFeedback(String(id))
        console.log(data)
        setFeedbacks(data.data.data)
  
      }
      catch(err){
        console.log(err);
      }
    
    }
    
    if(patientViewsTherapist){
    
      addfeed(therapistId);
  }
  else if(therapistViewsSelf){
    addfeed(currentUser?.id)
  }
    
  setNewFAdded(false); 
},[newFeedbackAdded])


  return (
    <Container>
      <PageHeader title={(patientViewsTherapist || editProfile)? 'Doctor\'s Profile':'My Profile'} />
      <SubContainer>
        <ProfileColumn span={6}>
          {loading
          ? (
            <>
              <Skeleton
                width={150}
                height={150}
                borderRadius={20}
                style={{ marginBottom: 20 }}
              />
              {(therapistViewsSelf || patientViewsSelf) && (
                <Skeleton
                  width={150}
                  height={30}
                  borderRadius={20}
                />
              )}
            </>
          )
          : (
            <FullWidthDiv>
              <Picture src={data?.imageUrl || DEFAULT_PROFILE_URL} />
              {(therapistViewsSelf || patientViewsSelf) && (
                <>
                  <Upload
                    {...{
                      onChange: (info: any) => dispatch(uploadPhotoAsync(info.fileList[0])),
                      style: {
                        width: '50%'
                      }
                    }}
                  >
                    <Button
                      name='Change Picture'
                      icon={<UploadIcon />}
                      height={30}
                      width={100}
                    />
                  </Upload>
                </>
              )}
            </FullWidthDiv>
          )}
        </ProfileColumn>
        <InfoColumn span={11}>
          <StyledAntSkeleton  loading={loading} active={loading}>
            <Title level={2} style={{ color: theme.copperBlue }}>Profile</Title>
            <P>{data?.name}</P>
            <P>{data?.email}</P>
            {(
              <>
                {!!data?.about && <P><blockquote>{`About Myself : ${data?.about}`}</blockquote></P>}
                {!!data?.qualification && data?.qualification?.map((q: string) => <P>{q}</P>)}
                {!!data?.experience && <P>{`${data?.experience} years of experience`}</P>}
                {!!data?.bookingUrl &&  userIsTherapist && (
                  <P>
                    <Link to={data?.bookingUrl} target='_blank'>Booking Link</Link>
                  </P>
                )}
                {!!data?.rating && (
                  <P>
                    {'Average Rating: '}
                    <StyledRate
                      disabled
                      size={15}
                      value={data?.rating} 
                    />
                  </P>
                )}
                {!!data?.consultationFee && (
                  <Fee>
                    &#8377; {data?.consultationFee}
                    <PerSession>/ Session</PerSession>
                  </Fee>
                )}
              </>
            )}
          </StyledAntSkeleton>
          {data?.feedback && (
            <StyledAntSkeleton loading={loading} active={loading}>
              <Title level={2} style={{ color: theme.copperBlue, display: 'flex' }}>
                Feedback/Rating
                { patientViewsTherapist &&(<Button
                  name='Add'
                  width={10}
                  // height={30}
                  onClick={() => setOpenFeedbackModal(true)}
                />)}
              </Title>
              <List
                header={`${data?.feedback?.length || 0} ratings`}
                itemLayout='horizontal'
                dataSource={feedbacks}
                renderItem={item => (
                  <Comment
                    author={(
                      <p>
                        {item?.patient?.name}<br />
                        <StyledRate allowHalf disabled value={item.rating} />
                      </p>
                    )}
                    avatar={item?.patient?.imageUrl || DEFAULT_PROFILE_URL}
                    content={item.comment}
                    datetime={new Date(item.createdAt).toUTCString()}
                    actions={(patientViewsTherapist && currentUser?.id == item?.patient?.id)? [
                      //<span key="comment-edit" onClick={openModal}>Edit</span>,
                      <Popconfirm
                        title='Do you confirm deleting this rating ?'
                        onConfirm={() => deleteFeedbackfn(item?.id)}
                        {...modalStyles}
                      >
                        <span key="comment-delete">Delete</span>
                      </Popconfirm>
                    ]: []}
                  />
                )}
              />
            </StyledAntSkeleton>
          )}
        </InfoColumn>
        <ActionsColumn span={7}>
          {loading
          ? (
            <>
              <Skeleton
                width={250}
                height={60}
                borderRadius={40}
              />
              <TagsArea>
                {[50, 100, 40, 120, 80].map(w => (
                  <ChipSkeleton
                    width={w}
                    height={30}
                    borderRadius={15}
                  />
                ))}
              </TagsArea>
            </>
          )
          : (therapistViewsSelf || patientViewsSelf || editProfile)
          ? (
            <>
              <StyledButton
                name='Edit Profile'
                description='Keep your profile updated to get more bookings'
                onClick={() => setOpenEditForm(true)}
                width={80}
                height={60}
                icon={<EditIcon />}
              />
              {data?.categories && (
                <TagsArea>
                  {data?.categories.map(c => <StyledTag>{c?.category?.name}</StyledTag>)}
                </TagsArea>
              )}
            </>
          )
          : (
            <CalendlyEventListener
              onDateAndTimeSelected={function (e: DateAndTimeSelectedEvent){
                if(e.data.event.length > 0) {
                  displayRazorpay()
                }
              }}
            >
              <PopupButton
                pageSettings={{
                  backgroundColor: 'ffffff',
                  hideEventTypeDetails: false,
                  hideGdprBanner: true,
                  hideLandingPageDetails: false,
                  primaryColor: theme.primary,
                  textColor: theme.copperBlue,
                }}
                styles={{
                  borderRadius: 40,
                  color: theme.neonGreen,
                  backgroundColor: theme.copperBlue,
                  padding: '20px 30px',
                  border: 0,
                  cursor: 'pointer'
                }}
                prefill={{
                  email: currentUser.email,
                  name: currentUser.name
                }}
                text={
                  data?.consultationFee
                    ? `Book a session now for ₹ ${data?.consultationFee}`
                    : `Fee missing in profile`
                  }
                url={data?.bookingUrl || ''}
              />
            </CalendlyEventListener>
          )}
        </ActionsColumn>
      </SubContainer>
      {openFeedbackModal && (
        <Feedback
          open={openFeedbackModal}
          closeModal={closeModal}
          therapistId ={therapistId}
          patientId ={currentUser.id} 
          setnewFAdded = {setNewFAdded}
        />
      )}
      {openEditForm && (
        <EditProfile
          visible={openEditForm}
          onClose={closeDrawer}
          user={data}
         
          userIsTherapist={userIsTherapist}
        />
      )}
    </Container>
  );
}

export default MyProfile;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: centrer;
`;

const SubContainer = styled(Row)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 30px 50px;
  background-color: white;
`;

const ProfileColumn = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FullWidthDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Picture = styled(Image)<{ src: string }>`
  width: 150px;
  height: 150px;
  border-radius: 20px;
  background: ${theme.lightblue} url("${props => props.src}") no-repeat fixed center;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.3);
  margin-bottom: 20px;

  $:hover {
    opacity: 0.9;
  }
`;

const UploadIcon = styled(UploadOutlined)`
  color: ${theme.neonGreen};
  margin-right: 5px;
`;

const EditIcon = styled(EditFilled)`
  color: ${theme.neonGreen};
`;

const TagsArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  width: 70%;
`;

const StyledTag = styled(Tag)`
  background-color: ${theme.chip};
  color: ${theme.copperBlue};
  border: 0;
  font-size: 15px;
  border-radius: 15px;
  padding: 5px 10px;
  margin: 10px 5px;
`;

const StyledButton = styled(Button)`
  border-radius: 25px;
`;

const InfoColumn = styled(Col)`
  display: flex;
  flex-direction: column;
`;

const Title = styled(Typography.Title)`
  margin-bottom: 15px;
`;

const P = styled(Typography.Text)`
  margin-bottom: 10px;
  color: ${theme.secondary};
  font-size: 16px;
`;

const Fee = styled(Typography.Text)`
  font-size: 16px;
  color: ${theme.copperBlue};
`;

const PerSession = styled(Typography.Text)`
  color: ${theme.secondaryText};
`;


const StyledRate = styled(Rate)<{ size?: number, width?: number}>`
  font-size: ${props => props.size? props.size: 12}px;
  margin-left: 5px;
`;

const ActionsColumn = styled(Col)`
  display: flex;
  flex-direction: column;
`;

const StyledAntSkeleton = styled(AntSkeleton)`
  width: 75%;
`;

const ChipSkeleton = styled(Skeleton)`
  margin: 10px 5px;
`;