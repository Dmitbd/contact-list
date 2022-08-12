import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserFriend } from "../types/types";

type UserFriendState = IUserFriend

const initialState: UserFriendState = {
  name: '',
  phone: '',
  author: '',
  id: ''
}

const popupOpenedSlice = createSlice({
  name: 'userFriend',
  initialState,
  reducers: {
    userFriend(state, action: PayloadAction<IUserFriend>) {
      return state = action.payload
    }
  }
})

export const { userFriend } = popupOpenedSlice.actions

export default popupOpenedSlice.reducer
