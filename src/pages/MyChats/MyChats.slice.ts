import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { notification } from 'antd'

import { RootState } from '../../redux/store';
import { API } from '../../shared/utils/helper';
import { STORAGE_KEY_CONSTANT, STORAGE_USER_CONSTANT } from '../../shared/utils/constants';


export interface ChatState {
  senderId: string;
  receiverId: string;
  content: string;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}
export interface TherapistState{
  id: string;
  name: string;
  email: string;
  imageUrl?: string;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;

}

export interface ProfileState {
  data:  ChatState | null;
  therapistList: TherapistState[];
  chatList : any[];

  status: 'idle' | 'loading' | 'failed';
  error: string | null;
  
}
const initialState: ProfileState = {
  data: null,
  therapistList: [],
  chatList: [],
  status: 'idle',
  error: null
};


export const TherapistList = createAsyncThunk(
  `chat/getRecieverList`,
 
  async () => {
    const response = await new Promise<{ data: TherapistState[] }>((resolve) =>
   
    setTimeout(() => resolve({ 
        data: [
          {id :"123",
          name:"Dr.Ajay",
          email:"ajaydoctor@gmail.com",
          status: "idle",
          error: "",
          },
           
          {id :"234",
          name:"Dr.Vijay",
          email:"Vijayvijay@gmail.com",
          status: "idle",
          error: "",
         },
         
          {id :"236",
          name:"Dr.Rajju",
          email:"Rajju123@gmail.com",
          status: "idle",
          error: "",
          },
          {id :"235",
          name:"Dr.shonty",
          email:"Rajju123@gmail.com",
          status: "idle",
          error: "",
          },

          {id :"1233",
          name:"Dr.lalalji",
          email:"Rajju123@gmail.com",
          status: "idle",
          error: "",
          },

          {id :"231232136",
          name:"Dr.Ramku",
          email:"Rajju123@gmail.com",
          status: "idle",
          error: "",
          }
        ],
    }), 1000)
    );
    
    
    return response.data
  }
)



export const fetchConversation = createAsyncThunk(
  'chat/getfetchConversation',
 
  async ({senderId, receiverId}: {senderId: string, receiverId: string}) => {
    try {
      const { data } = await API.get(`/chat/fetchConversation/${senderId}/${receiverId}`)
      if(data.success) {
        return data?.data
      } else {
        return data?.error
      }
    } catch (err: any) {
      return err?.response?.data
    }
  }
     
  )





export const sendMessage = createAsyncThunk(
  `chat/getTherapists`,
  async () => {
    const response = await new Promise<{ data: ChatState }>((resolve) =>
    setTimeout(() => resolve({ 
        data: {
           senderId:"",
            receiverId:"",
            content:"hi",
            status: "idle",
            error: "",

          },
    }), 1000)
    );
    return response.data
  }
)





export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = 'idle'
        state.data = action.payload
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = 'failed'
        state.error = String(action.payload)
      })
      .addCase(TherapistList.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(TherapistList.fulfilled, (state, action) => {
        state.status = 'idle'
        
        state.therapistList = action.payload
      })
      .addCase(TherapistList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = String(action.payload)
      })
      .addCase(fetchConversation.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchConversation.fulfilled, (state, action) => {
        state.status = 'idle'
        state.chatList= action.payload
      })
      .addCase(fetchConversation.rejected, (state, action) => {
        state.status = 'failed'
        state.error = String(action.payload)
      })

  },
});






export const selectData = (state: RootState) => state.chat;


export default chatSlice.reducer;
