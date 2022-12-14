import { useForm } from "react-hook-form"
import { addUserFriendAsync } from "../api/axios"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { addFriendPopupIsOpen } from "../store/openPopupSlice"
import { isAlert } from "../store/popupWithAlert"
import { UserFriend } from "../types/types"
import { minLengthIsTwo, onliNumbers, phoneFailFormat, requaredField } from "../utils/constants/formTextConstants"
import FormInput from "./FormInput"
import PopupWithForm from "./PopupWithForm"

const PopupWithAddUserFriend: React.FC = () => {

  const dispatch = useAppDispatch()
  const popupOpener = useAppSelector(state => state.popupOpener.addUserFriendPopup)
  const author = useAppSelector(state => state.user.id)
  const { handleSubmit, control, reset } = useForm<UserFriend>({ mode: 'onChange' })

  const handlerPopupClose = () => {
    dispatch(addFriendPopupIsOpen(false))
  }

  const addNewFriend = (newFriend: UserFriend): void => {
    newFriend = { name: newFriend.name, phone: newFriend.phone, author: author, id: newFriend.id }
    addUserFriendAsync(newFriend, dispatch)
    dispatch(isAlert({ isOpen: true, alertText: 'Друг добавлен' }))
    dispatch(addFriendPopupIsOpen(false))
    reset()
  }

  return (
    <PopupWithForm isOpen={popupOpener} onClose={handlerPopupClose} onSubmit={handleSubmit(addNewFriend)} title={'Добавление друга'} buttonText={'Добавить'} name={'add-friend'}>

      <FormInput
        name="name"
        placeholder="name"
        control={control}
        rules={{
          required: requaredField,
          minLength: { value: 2, message: minLengthIsTwo }
        }}
      />

      <FormInput
        name="phone"
        placeholder="phone"
        control={control}
        rules={{
          required: requaredField,
          pattern: { value: /^\d+$/, message: onliNumbers },
          minLength: { value: 11, message: phoneFailFormat },
          maxLength: { value: 11, message: phoneFailFormat }
        }}
      />

    </PopupWithForm>
  )
}

export default PopupWithAddUserFriend
