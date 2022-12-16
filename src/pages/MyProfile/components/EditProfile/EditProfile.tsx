import { useEffect } from 'react';
import { Drawer, Form, Input, Select, notification } from 'antd'

import { Button } from '../../../../shared/components'
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../redux/hooks';
import { fetchCategoriesAsync, selectData } from '../../../Home/Home.slice';
import { Patient, Therapist, updateTherapistProfileAsync, selectData as selectProfile } from '../../MyProfile.slice';
import styled from 'styled-components';
import { type } from 'os';
import { API } from '../../../../shared/utils/helper';

type EditProfileProps = {
  visible: boolean,
  onClose: () => void,
  user: (Therapist & Patient)|null,
  userIsTherapist: boolean,
}

function EditProfile({
  visible,
  onClose,
  user,
  userIsTherapist
}: EditProfileProps) {

  const dispatch = useDispatch()
  const { categories } = useAppSelector(selectData)
  const { status } = useAppSelector(selectProfile)
  

  let initialValues: any = {
    name: user?.name,
    email: user?.email,
  }

  if(userIsTherapist) {
    
    initialValues = {
      ...initialValues,
      ...user,
      consultationFee: (initialValues.consultationFee) as number,
      experience: (initialValues.experience) as number,
      categories: user?.categories?.map(c => c?.category?.name)
    }
  }

  const handleSubmit = async (values: any) => {
    try {
      if(userIsTherapist) {
        console.log(values)
        try {
          if(!user?.id) throw { response: { data: 'Important info missing, please refresh' } }
          const { data } = await API.put(`/therapist/${user.id}`, values)
          if(data?.success) {
            notification.success({ message: 'Updated details' })
           // return data?.data
          } else {
            //notification.success({ message: data?.error+"bwahahaha" })
            //return data?.error
          }
        } catch (err: any) {
          return console.log(err)
        }
      }
    } catch (e: any) {
      
     //notification.error({ message: e.message })
    }
  }

  useEffect(() => {
    if(userIsTherapist) {
      dispatch(fetchCategoriesAsync())
    }
  }, [])

  return (
    <Drawer
      closable
      visible={visible}
      onClose={onClose}
      title='Edit Profile'
    >
      <Form
        layout='vertical'
        size='middle'
        labelCol={{ span: 16 }}
        wrapperCol={{ span: 24 }}
        initialValues={initialValues}
        onFinish={handleSubmit}
        //onFinishFailed={e => console.log(e)}
      >
        <Form.Item name='name' label="Name">
          <StyledInput placeholder='Enter your name' />
        </Form.Item>
        <Form.Item name='email' label="Email">
          <StyledInput disabled placeholder='Enter your email' />
        </Form.Item>
        {userIsTherapist && (
          <>
            <Form.Item name='categories' label="Categories you can offer help">
              <StyledSelect
                allowClear
                mode='multiple'
                placeholder='Select categories'
              >
                {categories.map(({ id, name }) => (
                  <StyledSelect.Option value={id} key={id}>{name}</StyledSelect.Option>
                ))}
              </StyledSelect>
            </Form.Item>
            <Form.Item name='about' label="About">
              <StyledTextArea
                allowClear
                minLength={100}
                maxLength={300}
                showCount
                placeholder='A few words about yourself'
              />
            </Form.Item>
            <Form.Item name='experience' label="Experience">
              <StyledInput type='number' placeholder='Enter your total experience' />
            </Form.Item>
            <Form.Item name='consultationFee' label="Consultation Fee">
              <StyledInput type='number' placeholder='Enter your consultation fee' prefix='&#8377;' />
            </Form.Item>
            <Form.Item name='bookingUrl' label="Booking Link">
              <StyledInput placeholder='Paste your booking link' />
            </Form.Item>
          </>
        )}
        <Form.Item>
          <Button
            name='Submit'
            width={100}
            extraProps={{
              htmlType: 'submit',
              loading: status==='updating'
            }}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default EditProfile;

const StyledInput = styled(Input)`
  font-family: DM Sans;
`;

const StyledTextArea = styled(Input.TextArea)`
  font-family: DM Sans;
`;

const StyledSelect = styled(Select)`
  font-family: DM Sans;
`;