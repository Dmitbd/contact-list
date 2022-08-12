import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PopupOpened = {
  addUserFriendPopup: boolean,
  editUserFriendPopup: boolean,
  editUserPopup: boolean,
  errorFormPopup: boolean
}

type PopupOpenedState = PopupOpened

const initialState: PopupOpenedState = {
  addUserFriendPopup: false,
  editUserFriendPopup: false,
  editUserPopup: false,
  errorFormPopup: false,
}

const PopupOpenedSlice = createSlice({
  name: 'popupOpened',
  initialState,
  reducers: {
    addFriendPopupIsOpen(state, action: PayloadAction<boolean>) {
      state.addUserFriendPopup = action.payload
    },
    editFriendPopupIsOpen(state, action: PayloadAction<boolean>) {
      state.editUserFriendPopup = action.payload
    },
    editUserPopupIsOpen(state, action: PayloadAction<boolean>) {
      state.editUserPopup = action.payload
    },
    errorPopupIsOpen(state, action: PayloadAction<boolean>) {
      state.errorFormPopup = action.payload
    }
  }
})

export const {
  editFriendPopupIsOpen,
  addFriendPopupIsOpen,
  editUserPopupIsOpen,
  errorPopupIsOpen
} = PopupOpenedSlice.actions

export default PopupOpenedSlice.reducer
