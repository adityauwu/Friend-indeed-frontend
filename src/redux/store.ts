import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

// slices
import counterReducer from '../counter/counterSlice'
import homeReducer from '../pages/Home/Home.slice'
import meetingsReducer from '../pages/Home/HomeSlice'
import profileReducer from '../pages/MyProfile/MyProfile.slice'
import authReducer from '../pages/Login/Login.slice'
import chatReducer from '../pages/MyChats/MyChats.slice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    home: homeReducer,
    profile: profileReducer,
    auth: authReducer,
    chat: chatReducer,
    meetings: meetingsReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
