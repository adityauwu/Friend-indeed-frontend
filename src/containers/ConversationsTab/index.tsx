import React, { useState } from "react";

import CreateConversation from "../CreateConversation";
import ConversationCard from "../../pages/MyChats/components/ConversationCard";
import { Button } from "antd";
import "./styles.scss";
interface Props {
  contacts: any;
  conversations: any;
  handleSelectChat: any;
}


export default function ConversationsTab(props: Props) {
  const [creatingGroup, setCreatingGroup] = useState(false);

  const handleShowCreateConversation = () => {
    setCreatingGroup(!creatingGroup);
  };
  
  
  
  const { contacts, conversations, handleSelectChat } = props;

  return (
    <>
      <div className="conversations-tab">
        <div className="conversations-list">
          {conversations.therapistList.map((conv: { name: string; id: string; }, index: React.Key | null | undefined) => {
            return (
              <ConversationCard
                key={index}
                conversationName={conv.name}
                conversationImage={conv.id}
                conversationId={conv.id}
                onClick={() => handleSelectChat(conv)}
              />
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
