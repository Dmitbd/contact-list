import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IUserFrom = {
  username: string,
  email: string
}

type UserAuth = {
  accessToken: string,
  user: {
    username: string,
    email: string,
    password: string,
    id: number,
  },
  auth: boolean
}

type UserAuthState = UserAuth

const initialState: UserAuthState = {
  accessToken: '',
  user: {
    username: '',
    email: '',
    password: '',
    id: 0,
  },
  auth: false
}

const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    userAuth(state, action: PayloadAction<UserAuth>) {
      const [accessToken, user] = [action.payload.accessToken, action.payload.user]
      state.accessToken = accessToken
      state.user = user
      state.auth = true
    },
    userExit(state, action: PayloadAction<boolean>) {
      if (action.payload) {
        state.auth = false
      }
    },
    editUser(state, action: PayloadAction<IUserFrom>) {
      const [username, email] = [action.payload.username, action.payload.email]
      state.user.username = username
      state.user.email = email
    }
  }
})

export const { userAuth, editUser, userExit } = userAuthSlice.actions

export default userAuthSlice.reducer
