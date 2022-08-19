import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// попап с ошибками или данными, принимает строку и условие для открытия 

type PopupWithAlert = {
  isOpen: boolean,
  alertText?: string
}

type PopupWithAlertState = PopupWithAlert

const initialState: PopupWithAlertState = {
  isOpen: false,
  alertText: ''
}

const popupWithAlert = createSlice({
  name: 'popupWithAlert',
  initialState,
  reducers: {
    isAlert(state, action: PayloadAction<PopupWithAlert>) {
      return state = action.payload
    }
  }
})

export const { isAlert } = popupWithAlert.actions

export default popupWithAlert.reducer
