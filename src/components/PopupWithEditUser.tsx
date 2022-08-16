import { useEffect } from "react"
import { useState } from "react"
import { editUserAsync } from "../api/axios"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { editUserPopupIsOpen } from "../store/openPopupSlice"
import PopupWithForm from "./PopupWithForm"
import { isAlert } from "../store/popupWithAlert"
import { EditUserForm } from "../types/types"

const PopupWithEditUser: React.FC = () => {

  const dispatch = useAppDispatch()
  const popupOpener = useAppSelector(state => state.popupOpener.editUserPopup)
  const userAuthData = useAppSelector(state => state.user)

  const handlerPopupClose = () => {
    dispatch(editUserPopupIsOpen(false))
  }

  const [userEditForm, setUserEditForm] = useState<EditUserForm>({
    id: 0,
    username: '',
    email: ''
  })

  useEffect(() => {
    setUserEditForm({
      ...userEditForm,
      id: userAuthData.user.id,
      username: userAuthData.user.username,
      email: userAuthData.user.email
    })
  }, [popupOpener])


  const editUser: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (userEditForm.username !== userAuthData.user.username || userEditForm.email !== userAuthData.user.email) {
      editUserAsync(userEditForm, dispatch)
      dispatch(isAlert({ isOpen: true, alertText: 'Данные изменились' }))
      dispatch(editUserPopupIsOpen(false))
    } else {
      dispatch(isAlert({ isOpen: true, alertText: 'Ни одно поле не изменилось' }))
    }
  }

  const handleChangeInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setUserEditForm({ ...userEditForm, [e.target.name]: e.target.value })
  }

  return (
    <PopupWithForm isOpen={popupOpener} onClose={handlerPopupClose} onSubmit={editUser} title={'Редактировать профиль'} buttonText={'Изменить'} name={'edit-user'}>
      <input className="input-blue" type='text' placeholder='Username' value={userEditForm.username} name='username' onChange={handleChangeInput} ></input>
      <input className="input-blue" type='text' placeholder='Email' value={userEditForm.email} name='email' onChange={handleChangeInput} ></input>
    </PopupWithForm>
  )
}

export default PopupWithEditUser
