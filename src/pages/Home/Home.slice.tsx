import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../redux/store';
import { STORAGE_USER_CONSTANT } from '../../shared/utils/constants';
import { API } from '../../shared/utils/helper';
import { User } from '../MyProfile/MyProfile.slice';
import { TherapistInfoCardProps } from './components/TherapistInfoCard/TherapistInfoCard';
import { FriendInfoCardProps } from './components/FriendInNeedCard/FriendInNeedCard';

export type MeetingCardProps = {
  date?: string,
  time?: string,
  title?: string,
  meetingLink?: string,
  orderId?: string,
  createdAt?: any,
  patient?: any,
  therapist?: any

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


export type CategoryProps = {
  id: string,
  name: string,
  active: boolean,
  createdAt: string,
  updatedAt: string,
}

export type TherapistDataFilters = {
  category?: string,
  experience?: number,
  rating?: number,
  fee?: number,
  page: number,
  name?: string,
}

export type PatientDataFilters ={
 name?: string,
 email?: string,
 company?: string,
 page: number
}

export type Patient = {
  id: string,
  name: string,
  imageUrl: string,
  date: string,
  categories: string[]
}

export interface HomeState {
 
  data: TherapistInfoCardProps[];
  dataCount: number;
  categories: CategoryProps[];
  upcomingMeetings: MeetingCardProps[];
  upcomingMeets : MeetingCardProps2[];
  yourClients: any[];
 
  patients: any[];
  patientsToFollow : FriendInfoCardProps[];
  filters: TherapistDataFilters;
  patientFilters :PatientDataFilters;
  currentUser: any;
  status: 'idle' | 'therapistsloading' | 'categoriesloading' | 'meetingsloading' | 'patientsLoading' | 'failed';
  error: string | null;
}

const initialState: HomeState = {
  data: [],
  dataCount: 0,
  categories: [],
  upcomingMeetings: [],
  upcomingMeets: [],
  yourClients:[],
  
  patients: [],
  patientsToFollow:[],
  currentUser: null,
  filters: {
    category: undefined,
    experience: undefined,
    rating: undefined,
    fee: undefined,
    page: 1,
    name: ''
  },
  patientFilters :{
    name : "",
    email: "",
    company: "",
    page: 1
  },
  status: 'idle',
  error: null,
};

export const fetchTherapistsAsync = createAsyncThunk(
  'therapists/fetchData',
  async (filters: TherapistDataFilters, { rejectWithValue }) => {
    try {
      const response = await API.get('/therapist',{ params: filters });
      if(response.data.success) {
        return response.data;
      } else {
        rejectWithValue(response.data.error)
      }
    } catch (e: any) {
      rejectWithValue(e?.response?.data?.message)
    }
  }
);

export const fetchPatientToFollowAsync = createAsyncThunk(
  'therapists/fetchPatientToFollowData',
  async (filters: PatientDataFilters, { rejectWithValue }) => {
    console.log("inside fetchPatientToFollow")
    try {
      const response = await API.get('/patient',{ params: filters });
      if(response.data.success) {
        return response.data;
      } else {
        rejectWithValue(response.data.error)
      }
    } catch (e: any) {
      rejectWithValue(e?.response?.data?.message)
    }
  }
);



export const fetchCategoriesAsync = createAsyncThunk(
  'categories/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/category');
      if(response.data.success) {
        return response.data?.data;
      } else {
        rejectWithValue(response.data.error)
      }
    } catch (e: any) {
      rejectWithValue(e?.response?.data?.message)
    }
  }
);




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


// export const fetchUpcomingMeetingsAsync = createAsyncThunk(
//   'upcomingMeetings/fetchData',
//   async (
//     { user}: { user: any},
//     { rejectWithValue }
//   ) => {
//     try {
//       const { data } = await API.get(`/booking/${user.id}/upcoming-meetings?role=${user.role}`)
//      console.log(data);
//       if(data?.success) {
//         return data?.data
//       } else {
//         rejectWithValue(data?.error)
//       }
//     } catch (e: any) {
//       rejectWithValue(e?.response?.data)
//     }
//   }
// )

// export const fetchPatientsAsync = createAsyncThunk(
//   'patients/fetchData',
//   async (patientName: string, { rejectWithValue }) => {
//     try {
//       const currentUser = JSON.parse(String(localStorage.getItem(STORAGE_USER_CONSTANT)))
//       const response = await API.get(`therapist/${currentUser.id}/patients`, {
//         params: { patientName }
//       })
//       if(response.data.success) {
//         return response.data?.data;
//       } else {
//         rejectWithValue(response.data.error)
//       }
//     } catch (e: any) {
//       rejectWithValue(e?.response?.data?.message)
//     }
//   }
// )


export const fetchPatientsAsync = createAsyncThunk(
  'patients/fetchData',
  async (user: any, { rejectWithValue }) => {
    try {
      
      const response = await API.get(`/chatsubscription/${user.id}/fetchChatSubscription?role=${user.role}`)
      
      if(response.data.success) {
        return response.data?.data;
      } else {
        rejectWithValue(response.data.error)
      }
    } catch (e: any) {
      rejectWithValue(e?.response?.data?.message)
    }
  }
)



export const fetchPatients2Async = createAsyncThunk(
  'patientsclients/fetchData',
  async (user:any) => {
    console.log("here in home slice tring to fetch patients")
    try {
      
      const { data } = await API.get(`/chatsubscription/${user.id}/fetchChatSubscription?role=${user.role}`)
      if(data.success) {
        console.log('The patients that have subscribed are as follows---->')
        console.log(data)
        return data
      } else {
        return data?.error
      }
    } catch (err: any) {
      return err?.response?.data
    }
  }
)


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



export const homeSlice = createSlice({
  name: 'therapists',
  initialState,
  reducers: {
    setFilters: (state, action) => {     
      state.filters = action.payload
    },
    setPatientFilters :(state, action) =>{
      
      state.patientFilters = action.payload
      console.log(state.patientFilters);
    },
    incrementPage: (state) => {
      state.filters.page++ 
    },
    getCurrentUser: (state) => {
      const user = localStorage.getItem(STORAGE_USER_CONSTANT)
      state.currentUser = user && JSON.parse(user)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTherapistsAsync.pending, (state) => {
        state.status = 'therapistsloading';
      })
      .addCase(fetchTherapistsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload?.data?.data;
        state.dataCount = action.payload?.count
      })
      .addCase(fetchTherapistsAsync.rejected, (state, action) => {
        state.status = 'idle'
        state.error = String(action.payload)
      })
    builder
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'categoriesloading'
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.categories = action.payload;
      });
    // builder
    //   .addCase(fetchUpcomingMeetingsAsync.pending, (state) => {
    //     state.status = 'meetingsloading'
    //   })
    //   .addCase(fetchUpcomingMeetingsAsync.fulfilled, (state, action) => {
    //     state.status = 'idle'
    //     state.upcomingMeetings = action.payload;
    //   });
    builder
      .addCase(fetchPatientsAsync.pending, (state) => {
        state.status = 'patientsLoading'
      })
      .addCase(fetchPatientsAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.patients = action.payload;
      });
    
      builder
      .addCase(fetchPatientToFollowAsync.pending, (state) => {
        state.status = 'patientsLoading'
      })
      .addCase(fetchPatientToFollowAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.patientsToFollow = action.payload?.data?.data;
        state.dataCount = action.payload?.count
      });
      builder
      .addCase(fetchUpcomingMeetsAsync.pending, (state) => {
        state.status = 'meetingsloading'
      })
      .addCase(fetchUpcomingMeetsAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.upcomingMeets = action.payload;
      });
      builder
      .addCase(fetchUpcomingMeetingsAsync.pending, (state) => {
        state.status = 'meetingsloading'
      })
      .addCase(fetchUpcomingMeetingsAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.upcomingMeetings = action.payload;
      });
      builder
      .addCase(fetchPatients2Async.pending, (state) => {
        state.status = 'patientsLoading'
      })
      .addCase(fetchPatients2Async.fulfilled, (state, action) => {
        state.status = 'idle'
        state.yourClients = action.payload;
      });
      

  },
});

export const { setPatientFilters,setFilters, incrementPage } = homeSlice.actions;

export const selectData = (state: RootState) => state.home;

export default homeSlice.reducer;
