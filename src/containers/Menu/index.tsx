import React, { useState, useEffect } from "react";
import UploadProfileImage from "../UploadProfileImage";
import ContactsTab from "../ContactsTab";
import ConversationsTab from "../ConversationsTab";
import { Button, Tabs, Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import "./styles.scss";
import { useDispatch } from "react-redux";

import { useAppSelector } from "../../redux/hooks";
import { fetchRecievers, selectData,TherapistList } from "../../pages/MyChats/MyChats.slice";
interface Props {
  user: any;
  contacts: any;
  conversations: any;
  handleSelectChat: any;
  handleRemoveContact: any;
  handleAddContact: any;
  handleUpdateContact: any;
}

export default function MenuContent(props: Props) {
  const [toFetchContacts, setToFetchContacts] = useState(false);
  const [changingProfileImage, setChangingProfileImage] = useState(false);
  const [profileImage, setProfileImage] = useState("" as any);
  const [loading, setLoading] = useState(false);

  const {
     contacts,
    conversations,
    handleSelectChat,
    user,
    // handleRemoveContact,
    // handleAddContact,
    // handleUpdateContact,
  } = props;
  // const { currentUser } = auth;
  //const conversation =[]
  const dispatch = useDispatch()
  const TherapistListData=useAppSelector(selectData);
  //const [conversationLocal,setconversationLocal] = useState([]);
  useEffect(() => {
    console.log(user)
    dispatch(fetchRecievers(user))
    dispatch(TherapistList());
 
  },[]);
  
  

 
 

  const handleChangeProfileImage = () => {
    setChangingProfileImage(!changingProfileImage);
  };

  const handleUpdateProfileImage = (updatedImage: string) => {
    setProfileImage(updatedImage);
  };

  const handleRemoveProfileImage = () => {
    setProfileImage(null);
    // removeProfileImage();
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={handleChangeProfileImage}>
        Change profile image
      </Menu.Item>
      <Menu.Item key="2" onClick={handleRemoveProfileImage}>
        Remove profile image
      </Menu.Item>
      <Menu.Item key="3">
        Sign out
      </Menu.Item>
    </Menu>
  );
  
  console.log(TherapistListData)
  return (
    <>
      {loading ? (
        <Button
          loading
          shape="circle"
          style={{
            position: "absolute",
            left: "45%",
            top: "20%",
          }}
        />
      ) : (
        <div className="app-container__menu__content">
          <header>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                onClick={() => console.log()}
                shape="circle"
                style={{
                  height: "40px",
                  width: "40px",
                  backgroundImage: `url(${profileImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                
              </Button>
              <span style={{ marginLeft: "12px", fontWeight: 500 }}>
                {user.displayName}
              </span>
            </div>

            {/* <Dropdown.Button
              overlay={menu}
              icon={<MoreOutlined style={{ fontSize: "1.65rem" }} />}
            /> */}
          </header>
          <div className="tabs-container">
            <Tabs defaultActiveKey="1" centered>
              
              <Tabs.TabPane tab="Coversations" key="1">
                <ConversationsTab
                  contacts={contacts}
                  conversations={TherapistListData}
                  handleSelectChat={handleSelectChat}
                  currentUserRole = {user.role}
                />
              </Tabs.TabPane>
              {/* <Tabs.TabPane tab="Contacts" key="2">
                <ContactsTab
                  user={user}
                  contacts={contacts}
                  setToFetchContacts={setToFetchContacts}
                  toFetchContacts={toFetchContacts}
                  handleRemoveContact={handleRemoveContact}
                  handleAddContact={handleAddContact}
                  handleUpdateContact={handleUpdateContact}
                />
              </Tabs.TabPane> */}
            </Tabs>
          </div>
        </div>
      )}

      <UploadProfileImage
        isVisible={changingProfileImage}
        handleChangeProfileImage={handleChangeProfileImage}
        handleUpdateProfileImage={handleUpdateProfileImage}
      />
    </>
  );
}
