import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserFriend } from "../types/types";

type UserFriendState = UserFriend

const initialState: UserFriendState = {
  name: '',
  phone: '',
  author: '',
  id: 0
}

const popupOpenedSlice = createSlice({
  name: 'userFriend',
  initialState,
  reducers: {
    userFriend(state, action: PayloadAction<UserFriend>) {
      return state = action.payload
    }
  }
})

export const { userFriend } = popupOpenedSlice.actions

export default popupOpenedSlice.reducer
