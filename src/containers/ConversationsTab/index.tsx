import React, { useState } from "react";

import CreateConversation from "../CreateConversation";
import ConversationCard from "../../pages/MyChats/components/ConversationCard";
import { Button } from "antd";
import "./styles.scss";
interface Props {
  contacts: any;
  conversations: any;
  handleSelectChat: any;
  currentUserRole: any;
}


export default function ConversationsTab(props: Props) {
  const [creatingGroup, setCreatingGroup] = useState(false);

  const handleShowCreateConversation = () => {
    setCreatingGroup(!creatingGroup);
  };
  
  
  
  const { contacts, conversations, handleSelectChat,currentUserRole} = props;

  // const roleMap = {
  //   ['']: User.therapist.toLowerCase(),
  //   [User.therapist]: User.patient.toLowerCase()
  // }

  return (
    <>
      <div className="conversations-tab">
        <div className="conversations-list">
          {conversations.recieverList.map((conv:{patient: any;therapist:any;} , index: React.Key | null | undefined) => {
            console.log(conv)
            console.log(currentUserRole)
      
           return (
              <ConversationCard
                key={index}
                conversationName={ currentUserRole=='Patient'? conv.therapist.name : conv.patient.name }
                conversationImage={ currentUserRole=='Patient'? conv.therapist.imageUrl : conv.patient.imageUrl}
                conversationId={ currentUserRole=='Patient'? conv.therapist.id : conv.patient.id}
                onClick={() => handleSelectChat(currentUserRole=='Patient'? conv.therapist : conv.patient)}
              />

             
            //   <ConversationCard
            //   key={index}
            //   conversationName={ "Testing" }
            //   conversationImage={ "Testing"}
            //   conversationId={ "123"}
            //   onClick={() => handleSelectChat(currentUserRole=='Patient'? conv.therapist : conv.patient)}
            // />

            );
          })}
        </div>
        {/* <Button onClick={handleShowCreateConversation}>New conversation</Button> */}
      </div>
      {/* <CreateConversation
        contacts={TherapistLocal}
        creatingGroup={creatingGroup}
        handleShowCreateConversation={handleShowCreateConversation}
        handleSelectChat={handleSelectChat}
      /> */}
    </>
  );
}
