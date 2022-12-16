import { API } from '../shared/utils/helper';




export const getMessages = (senderId: string, recieverId : string) => API.get(`/chat/fetchConversation/${senderId}/${recieverId}`);
export const addMessages = (message: any) => API.post(`/chat/saveConversation/`,message);

export const FollowedFriends = (userId: string) => API.get(`/addFriend/fetchFriends/${userId}`);
export const addFriend = (data: any) => API.post(`fetchFriends/`,data);

export const getUserMood = (userId: string) => API.get(`/mood/GetMood/${userId}`)
//export const addMessage = (data: any) => API.post('/message/', data);