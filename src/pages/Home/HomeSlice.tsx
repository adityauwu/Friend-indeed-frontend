import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../redux/store';
import { STORAGE_USER_CONSTANT } from '../../shared/utils/constants';
import { API } from '../../shared/utils/helper';


export type MeetingCardProps = {
  date: string,
  time: string,
  title: string,
  meetingLink: string,
  orderId?: string,
  createdAt?: any,
  patientId?:any,
  therapistId?:any
}


export type MeetingCardProps2 = {
  date?: string,
  time?: string,
  title?: string,
  meetingLink: string,
  orderId?: string,
  createdAt?: any,
  patientId?:any,
  therapistId?:any
}


export interface HomeState {
  

  upcomingMeetings: MeetingCardProps[];


  upcomingMeets: MeetingCardProps2[];
  
  status: 'idle' | 'therapistsloading' | 'categoriesloading' | 'meetingsloading' | 'failed';
}

export const initialState: HomeState = {
  
  upcomingMeetings: [],

  upcomingMeets: [],
 
  status: 'idle',
};

// export const fetchTherapistsAsync = createAsyncThunk(
//   'therapists/fetchData',
//   async (filters: TherapistDataFilters) => {
//     console.log(filters)
//     const response = await API.get('/therapist',{ params: filters });
//     return response.data?.data;
//   }
// );

// export const fetchCategoriesAsync = createAsyncThunk(
//   'categories/fetchData',
//   async () => {
//     const response = await API.get('/category');
//     return response.data?.data;
//   }
// );

export const fetchUpcomingMeetingsAsync = createAsyncThunk(
  'upcomingMeetings/fetchData',
  async () => {
    const response = await new Promise<{ data: MeetingCardProps[] }>((resolve) =>
    setTimeout(() => resolve({ 
      data:  [
        {
          date: "25 Jan",
          time: "04: 00pm",
          title: "Session between Lakshitha & Dr.Khanchandani",
          meetingLink: "https://meet.google.com/zwb-koam-dgs",
        },
        {
          date: "04 Feb", 
          time: "01: 00pm",
          title: "Session between Lakshitha & Dr.Mohini",
          meetingLink: "https://meet.google.com/zwb-koam-dgs",
        },
        {
          date: "16 Feb",
          time: "05: 00pm",
          title: "Session between Lakshitha & Dr.Parag",
          meetingLink: "https://meet.google.com/zwb-koam-dgs",
        }
      ]
    }), 1000)

    );
    return response.data
  }
)



export const fetchUpcomingMeetsAsync = createAsyncThunk(
  'upcomingMeets/fetchData',
  async ( ) => {
    try {
      const currentUser = JSON.parse(String(localStorage.getItem(STORAGE_USER_CONSTANT)))
      const response =  await API.get(`/booking/${currentUser.id}/upcoming-meetings?role=${currentUser.role}`)
      console.log(response)
      if(response.data.success) {
        return response.data?.data;
      } else {
        console.log(response.data.error)
        return (response.data.error)
      }
    } catch (e: any) {
      console.log(e?.response?.data?.message)
      return(e?.response?.data?.message)
    }
  }
)





export const meetingsSlice = createSlice({
  name: 'meetings',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
    //   .addCase(fetchTherapistsAsync.pending, (state) => {
    //     state.status = 'therapistsloading';
    //   })
    //   .addCase(fetchTherapistsAsync.fulfilled, (state, action) => {
    //     state.status = 'idle';
    //     state.data = action.payload;
    //   })
    // builder
    //   .addCase(fetchCategoriesAsync.pending, (state) => {
    //     state.status = 'categoriesloading'
    //   })
    //   .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
    //     state.status = 'idle'
    //     state.categories = action.payload;
    //   });
    // builder
      .addCase(fetchUpcomingMeetingsAsync.pending, (state) => {
        state.status = 'meetingsloading'
      })
      .addCase(fetchUpcomingMeetingsAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.upcomingMeetings = action.payload;
      })

      builder
      .addCase(fetchUpcomingMeetsAsync.pending, (state) => {
        state.status = 'meetingsloading'
      })
      .addCase(fetchUpcomingMeetsAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.upcomingMeets = action.payload;
      });
  },
});

// export const { setFilters } = homeSlice.actions;

export const selectData = (state: RootState) => state.home;

export default meetingsSlice.reducer;
