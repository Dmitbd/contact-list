import { useEffect } from "react"
import { editUserFriendByIdAsync } from "../api/axios"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { editFriendPopupIsOpen } from "../store/openPopupSlice"
import PopupWithForm from "./PopupWithForm"
import { isAlert } from "../store/popupWithAlert"
import FormInput from "./FormInput"
import { requaredField } from "../utils/constants/formTextConstants"
import { SubmitHandler, useForm } from "react-hook-form"
import { IUserFriend } from "../types/types"

const PopupWithEditUserFriend: React.FC = () => {

  const { handleSubmit, control, setValue, getValues } = useForm<IUserFriend>({ mode: 'onChange' })

  const dispatch = useAppDispatch()
  const popupOpener = useAppSelector(state => state.popupOpener.editUserFriendPopup)
  const friendDataById = useAppSelector(state => state.userFriend)

  const handlerPopupClose = (): void => {
    dispatch(editFriendPopupIsOpen(false))
  }

  useEffect(() => {
    setValue('name', friendDataById.name)
    setValue('phone', friendDataById.phone)
  }, [popupOpener])

  const editFriendById: SubmitHandler<IUserFriend> = (userFriend): void => {
    const [name, phone] = getValues(['name', 'phone'])
    if (name !== friendDataById.name || phone !== friendDataById.phone) {
      userFriend.id = friendDataById.id
      editUserFriendByIdAsync(userFriend, dispatch)
      dispatch(editFriendPopupIsOpen(false))
      dispatch(isAlert({ isOpen: true, alertText: 'Данные изменились' }))
    } else {
      dispatch(isAlert({ isOpen: true, alertText: 'Ни одно поле не изменилось' }))
    }
  }

  return (
    <PopupWithForm isOpen={popupOpener} onClose={handlerPopupClose} onSubmit={handleSubmit(editFriendById)} title={'Редактировать друга'} buttonText={'Изменить'} name={'edit-friend'}>

      <FormInput
        name="name"
        placeholder="name"
        control={control}
        rules={{
          required: requaredField,
        }}
      />

      <FormInput
        name="phone"
        placeholder="phone"
        control={control}
        rules={{
          required: requaredField,
        }}
      />

    </PopupWithForm>
  )
}

export default PopupWithEditUserFriend
