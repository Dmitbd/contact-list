import { configureStore } from '@reduxjs/toolkit'
import userAuthReduser from './userAuthSlice'
import userFriendsReducer from './userFriendsSlice'
import popupReducer from './openPopupSlice'
import userFriendReducer from './userFriendSlice'
import popupWithAlertReducer from './popupWithAlert'

const store = configureStore({
  reducer: {
    user: userAuthReduser,
    userFriends: userFriendsReducer,
    userFriend: userFriendReducer,
    popupOpener: popupReducer,
    popupWithAlert: popupWithAlertReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
