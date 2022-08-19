import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// стейт с массивом друзей

type UserFriends = Array<{
  name: string,
  phone: string,
  author: string | number,
  id: number
}>

type UserFriendsState = UserFriends

const initialState: UserFriendsState = []

type INewUserFriend = {
  name: string,
  phone: string,
  author: string | number,
  id: number
}

type EditUserFriend = {
  name: string,
  phone: string,
  id: number
}

const userFriendsSlice = createSlice({
  name: 'userFriends',
  initialState,
  reducers: {
    getUserFriends(state, action: PayloadAction<UserFriends>) {
      return state = action.payload
    },
    addUserFriend(state, action: PayloadAction<INewUserFriend>) {
      return [...state, action.payload]
    },
    deleteUserFriend(state, action: PayloadAction<number | string>) {
      return state = state.filter(friend => friend.id !== action.payload)
    },
    editUserFriend(state, action: PayloadAction<EditUserFriend>) {
      state.map(friend => {
        if (friend.id === action.payload.id) {
          friend.name = action.payload.name
          friend.phone = action.payload.phone
        }
        return
      })
    }
  }
})

export const { getUserFriends, addUserFriend, deleteUserFriend, editUserFriend } = userFriendsSlice.actions

export default userFriendsSlice.reducer
