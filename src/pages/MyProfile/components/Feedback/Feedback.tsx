import React, { useState } from 'react'
import { Modal, Rate, Input, Space } from 'antd'
import { update } from 'lodash'

type FeedbackProps = {
  open: boolean,
  closeModal: () => void
}

const Feedback = ({
  open,
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
  const updatefeedback = async (values : any)=>{
    try{


    }
    catch{
      
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