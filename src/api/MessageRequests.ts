import { AntAnchor } from 'antd/lib/anchor/Anchor';
import { API } from '../shared/utils/helper';



//message routes
export const getMessages = (senderId: string, recieverId : string) => API.get(`/chat/fetchConversation/${senderId}/${recieverId}`);
export const addMessages = (message: any) => API.post(`/chat/saveConversation/`,message);


//friend routes
export const FollowedFriends = (userId: string) => API.get(`/addFriend/fetchFriends/${userId}`);
export const addtoFriend = (data: any,userId: string) => API.post(`addFriend/add/${userId}`,data);
export const checkFriend = ( userId: string, friendId : string ) => API.get(`/addFriend/find/${userId}/${friendId}`)
export const removeFriend = (uuid: string) => API.delete(`/addFriend/unfollow/${uuid}`)

//mood routes
export const getUserMood = (userId: string) => API.get(`/mood/GetMood/${userId}`)




//export const addMessage = (data: any) => API.post('/message/', data);


//feedback route
export const saveFeedback = ( info: any) => API.post(`/feedback`, info);
export const deleteFeedback = (id : any) => API.delete(`/feedback/${id}`)
export const getFeedback = (id : any) => API.get(`/feedback/${id}/therapist?role=Therapist`)