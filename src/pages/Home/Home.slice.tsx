import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../redux/store';
import { STORAGE_USER_CONSTANT } from '../../shared/utils/constants';
import { API } from '../../shared/utils/helper';
import { User } from '../MyProfile/MyProfile.slice';
import { TherapistInfoCardProps } from './components/TherapistInfoCard/TherapistInfoCard';
import { FriendInfoCardProps } from './components/FriendInNeedCard/FriendInNeedCard';

export type MeetingCardProps = {
  date: string,
  time: string,
  title: string,
  meetingLink: string,
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
  patients: Patient[];
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

export const fetchUpcomingMeetingsAsync = createAsyncThunk(
  'upcomingMeetings/fetchData',
  async (
    { userId, role }: { userId: string, role: User},
    { rejectWithValue }
  ) => {
    try {
      const { data } = await API.get(`booking/${userId}/upcoming-meetings`, {
        params: { role }
      })
      if(data?.success) {
        return data?.data
      } else {
        rejectWithValue(data?.error)
      }
    } catch (e: any) {
      rejectWithValue(e?.response?.data)
    }
  }
)

export const fetchPatientsAsync = createAsyncThunk(
  'patients/fetchData',
  async (patientName: string, { rejectWithValue }) => {
    try {
      const currentUser = JSON.parse(String(localStorage.getItem(STORAGE_USER_CONSTANT)))
      const response = await API.get(`therapist/${currentUser.id}/patients`, {
        params: { patientName }
      })
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
    builder
      .addCase(fetchUpcomingMeetingsAsync.pending, (state) => {
        state.status = 'meetingsloading'
      })
      .addCase(fetchUpcomingMeetingsAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.upcomingMeetings = action.payload;
      });
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

  },
});

export const { setPatientFilters,setFilters, incrementPage } = homeSlice.actions;

export const selectData = (state: RootState) => state.home;

export default homeSlice.reducer;
