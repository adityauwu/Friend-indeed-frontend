import React, { useState } from 'react'
import { Modal, Rate, Input, Space } from 'antd'
import { update } from 'lodash'
import { NULL } from 'sass'
import { saveFeedback } from '../../../../api/MessageRequests'

type FeedbackProps = {
  open: boolean,
  therapistId : any,
  patientId : any,
  setnewFAdded: any,
  closeModal: () => void
}

const Feedback = ({
  open,
  therapistId,
  patientId,
  setnewFAdded,
  closeModal
}: FeedbackProps) => {

  const modalStyles = {
    okButtonProps: { style: { fontFamily: 'DM Sans', borderRadius: '20px' } },
    cancelButtonProps: { style: { fontFamily: 'DM Sans', borderRadius: '20px' } },
    style: { padding: '50px' }
  }

  const [rating, setRating] = useState(0)
  const [notes, setNotes] = useState('')

  const handleRating = (value: number) => setRating(value)
  const handleNotes = (e: React.BaseSyntheticEvent) => setNotes(e.target.value)
  const updatefeedback = async ()=>{
    if(therapistId!=null){

    const data ={
      rating : rating,
      comment : notes,
      therapistId : therapistId,
      patientId : patientId
    }
    try{
      const data1= await saveFeedback(data)
      setnewFAdded(true)
      console.log(data1.data);

    }
    catch(error){
      console.log("Cant Save Feedback sorry");
    }
  
  
    }
  }
  
  return (
    <Modal
      closable
      visible={open}
      title='Edit Feedback'
      okText='Update'
      onCancel={closeModal}
       onOk={updatefeedback}
      {...modalStyles}
    >
      <Space direction='vertical' style={{ width: '100%' }}>
        <Rate value={rating} onChange={handleRating} />
        <Input.TextArea value={notes} onChange={handleNotes} />
      </Space>
    </Modal>
  )
}

export default Feedback