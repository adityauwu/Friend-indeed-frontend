import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { notification } from 'antd'

import { RootState } from '../../redux/store';
import { API } from '../../shared/utils/helper';

export enum User {
  patient = 'Patient',
  therapist = 'Therapist'
}

export type Therapist = {
  id: string,
  name: string,
  email: string,
  imageUrl?: string,
  about?: string,
  consultationFee?: number,
  experience?: number,
  bookingUrl: string,
  rating?: number,
  onboarded?: boolean,
  feedback?: any[],
  categories?: any[],
  qualification?: string[],
  role: string,
  createdAt?: string,
  updatedAt?: string,
}

export type Patient = {
  id: string,
  name: string,
  email: string,
  imageUrl?: string,
  booking?: any[],
  feedback?: any[],
  subscription?: any,
  role: string,
  active?: boolean,
  createdAt?: string,
  updatedAt?: string,
}

export interface ProfileState {
  data: Therapist & Patient | null;
  status: 'idle' | 'therapistProfileLoading' | 'patientProfileLoading' | 'paymentLoading' |'updating' | 'failed';
  error: string | null;
  order: any
}

const initialState: ProfileState = {
  data: null,
  status: 'idle',
  error: null,
  order: null
};

export const fetchTherapistProfileAsync = createAsyncThunk(
  'therapistProfile/fetchData',
  async (id: string, { rejectWithValue }) => {
    try {
      let response
      const [{ data: therapist }, {  data: feedbacks }] = await Promise.all([
        API.get(`/therapist/${id}`),
        API.get(`/feedback/${id}/therapist?role=Therapist`),
      ])
      if(therapist.success) {
        response = { ...therapist?.data }
      } else {
        return rejectWithValue(therapist?.error)
      }

      if(feedbacks.success) {
        response = { ...response, feedback: feedbacks?.data }
      } else {
        return rejectWithValue(feedbacks?.error)
      }
      return response
    } catch (err: any) {
      return rejectWithValue(err?.response?.data)
    }
  }
)

export const updateTherapistProfileAsync = createAsyncThunk(
  'therapistProfile/updateData',
  async (
    {id, input}: { id: string , 
      input: Partial<Therapist> }
    
  ) => {
    try {
      if(!id) throw { response: { data: 'Important info missing, please refresh' } }
      const { data } = await API.put(`/therapist/${id}`, input)
      if(data?.success) {
        //notification.success({ message: 'Updated details' })
        return data?.data
      } else {
        //notification.success({ message: data?.error+"bwahahaha" })
        return data?.error
      }
    } catch (err: any) {
      return err
    }
  }
)

export const fetchPatientProfileAsync = createAsyncThunk(
  'patientProfile/fetchData',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/patient/${id}`)
      if(data.success) {
        return data?.data
      } else {
        return rejectWithValue(data?.error)
      }
    } catch (err: any) {
      return rejectWithValue(err?.response?.data)
    }
  }
)

export const initiatePaymentAsync = createAsyncThunk(
  'payment/initiate',
  async (
    input: {
      patientId: string,
      therapistId: string,
      amount: number
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await API.post(`/payment`, {
        ...input
      })
      if(data.success) {
        return data?.data
      } else {
        return rejectWithValue(data?.error)
      }
    } catch (err: any) {
      return rejectWithValue(err?.response?.data)
    }
  }
)

export const completePaymentAsync = createAsyncThunk(
  'payment/complete',
  async (
    input: any,
    { rejectWithValue }
  ) => {
    try {
      const { data } = await API.post(`/payment/verification`, {
        ...input
      })
      if(data.success) {
        return data?.data
      } else {
        return rejectWithValue(data?.error)
      }
    } catch (err: any) {
      return rejectWithValue(err?.response?.data)
    }
  }
)

export const uploadPhotoAsync = createAsyncThunk(
  'profile/uploadPicture',
  async (data: any) => {
    const response = await axios.post(`https://api.cloudinary.com/v1_1/friendindeed/image/upload`, {
      file: data,
      upload_preset: 'msi4hdgz',
      timestamp: new Date().toLocaleDateString(),
      api_key: '437741655674911',
      signature: 'BJk-ociOBpdvGhtYgiRWegpqitU'
    })
    return response.data
  }
)

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTherapistProfileAsync.pending, (state) => {
        state.status = 'therapistProfileLoading';
      })
      .addCase(fetchTherapistProfileAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(fetchTherapistProfileAsync.rejected, (state, action) => {
        state.status = 'idle'
        state.error = String(action.payload)
      })
    builder
      .addCase(updateTherapistProfileAsync.pending, (state) => {
        state.status = 'updating'
      })
      .addCase(updateTherapistProfileAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.data = {
          ...action.payload,
          feedback: state.data?.feedback,
        }
      })
      .addCase(updateTherapistProfileAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = String(action.payload)
      })
    builder
      .addCase(fetchPatientProfileAsync.pending, (state) => {
        state.status = 'patientProfileLoading';
      })
      .addCase(fetchPatientProfileAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(fetchPatientProfileAsync.rejected, (state, action) => {
        state.status = 'idle'
        state.error = String(action.payload)
      })
    builder
      .addCase(initiatePaymentAsync.pending, (state) => {
        state.status = 'paymentLoading'
      })
      .addCase(initiatePaymentAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.order = action.payload
      })
    builder
      .addCase(completePaymentAsync.pending, (state) => {
        state.status = 'paymentLoading'
      })
      .addCase(completePaymentAsync.fulfilled, (state) => {
        state.status = 'idle'
      })
  },
});

export const selectData = (state: RootState) => state.profile;

export default profileSlice.reducer;
