import { useEffect } from "react"
import { editUserAsync } from "../api/axios"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { editUserPopupIsOpen } from "../store/openPopupSlice"
import PopupWithForm from "./PopupWithForm"
import { isAlert } from "../store/popupWithAlert"
import { useForm } from "react-hook-form"
import FormInput from "./FormInput"
import { requaredField } from "../utils/constants/formTextConstants"

const PopupWithEditUser: React.FC = () => {

  const { handleSubmit, control, setValue, getValues } = useForm({ mode: 'onChange' })

  const dispatch = useAppDispatch()
  const popupOpener = useAppSelector(state => state.popupOpener.editUserPopup)
  const userAuthData = useAppSelector(state => state.user)

  const handlerPopupClose = () => {
    dispatch(editUserPopupIsOpen(false))
  }

  useEffect(() => {
    setValue('username', userAuthData.user.username)
    setValue('email', userAuthData.user.email)
  }, [popupOpener])

  const editUser = (userData: any) => {
    const inputValues = getValues(['username', 'email'])
    if (inputValues[0] !== userAuthData.user.username || inputValues[1] !== userAuthData.user.email) {
      userData.id = userAuthData.user.id
      editUserAsync(userData, dispatch)
      dispatch(isAlert({ isOpen: true, alertText: 'Данные изменились' }))
      dispatch(editUserPopupIsOpen(false))
    } else {
      dispatch(isAlert({ isOpen: true, alertText: 'Ни одно поле не изменилось' }))
    }
  }

  return (
    <PopupWithForm isOpen={popupOpener} onClose={handlerPopupClose} onSubmit={handleSubmit(editUser)} title={'Редактировать профиль'} buttonText={'Изменить'} name={'edit-user'}>

      <FormInput
        name="username"
        placeholder="username"
        control={control}
        rules={{
          required: requaredField,
        }}
      />

      <FormInput
        name="email"
        placeholder="email"
        control={control}
        rules={{
          required: requaredField
        }}
      />

    </PopupWithForm>
  )
}

export default PopupWithEditUser
