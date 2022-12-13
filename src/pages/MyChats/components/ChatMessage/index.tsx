import { useEffect, useState } from "react";
import { userData } from "../../../Login/LoginSlice";
import "./styles.scss";

 interface Props {
  text: string;
  user: any;
  createdBy: string;
  createdAt?: any;
  selectedChat: any;
 
}
 //fecth from auth current user
 export default function ChatMessage(props: Props) {
  const [senderName, setSenderName] = useState(null as any);
  const { text, createdBy, createdAt,user ,selectedChat} = props;
  const currentusername= user.name; 
  const messageType = createdBy === user.id ? "sent" : "received";

  useEffect(() => {
    //const contact = contacts.find((elem: any) => elem.uid == createdBy);
   
     const sender=  createdBy === user.id ? currentusername : selectedChat.name;
     setSenderName(sender) ;
    // if (contact) {
    //   setSenderName(contact.contactName);
    // } else if (createdBy !== auth.currentUser?.uid) {
    //   setSenderName(createdBy);
    // } else {
    //   setSenderName(user.displayName);
    // }
  }, );

  return (
    <>
      { (
        <div className={`message ${messageType}`}>
          <div className="message__content">
            <div className="message__content__sender">{senderName}</div>
            <div className="message__content__text">{text}</div>
            <p className="message__content__at">
              {createdAt}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

function toDateTime(secs: number) {
  const t = new Date(0); // Epoch
  t.setUTCSeconds(secs);
  const hours = t.getHours();
  const minutes = t.getMinutes();

  return (
    <span>
      {hours > 9 ? hours : <>0{hours}</>}:
      {minutes > 9 ? minutes : <>0{minutes}</>}
    </span>
  );
}


