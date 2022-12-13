import { API } from '../shared/utils/helper';




export const getMessages = (senderId: string, recieverId : string) => API.get(`/chat/fetchConversation/${senderId}/${recieverId}`);
export const addMessages = (message: any) => API.post(`/chat/saveConversation/`,message);

//export const addMessage = (data: any) => API.post('/message/', data);