import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserFrom = {
  username: string,
  email: string
}

type UserSignUp = string

type UserAuth = {
  accessToken: string,
  username: string,
  email: string,
  password: string,
  id: number,
  auth: boolean
}

type UserAuthState = UserAuth

const initialState: UserAuthState = {
  accessToken: '',
  username: '',
  email: '',
  password: '',
  id: 0,
  auth: false
}

const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    userSignUp(state, action: PayloadAction<UserSignUp>) {
      state.email = action.payload
    },
    userAuth(state, action: PayloadAction<UserAuth>) {
      localStorage.setItem('email', action.payload.email)
      localStorage.setItem('password', action.payload.password)
      return state = action.payload
    },
    userExit(state, action: PayloadAction<boolean>) {
      if (action.payload) {
        localStorage.removeItem('email')
        localStorage.removeItem('password')
        state.accessToken = ''
        state.username = ''
        state.email = ''
        state.password = ''
        state.id = 0
        state.auth = false
      }
    },
    editUser(state, action: PayloadAction<UserFrom>) {
      const [username, email] = [action.payload.username, action.payload.email]
      state.username = username
      state.email = email
    }
  }
})

export const { userSignUp, userAuth, editUser, userExit } = userAuthSlice.actions

export default userAuthSlice.reducer
