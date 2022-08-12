import { useEffect, useState } from "react"
import { editUserFriendByIdAsync } from "../api/axios"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { editFriendPopupIsOpen } from "../store/openPopupSlice"
import PopupWithForm from "./PopupWithForm"
import { IUserFriend } from "../types/types"
import { isAlert } from "../store/popupWithAlert"

const EditUserFriendPopup: React.FC = () => {

  const dispatch = useAppDispatch()
  const popupOpener = useAppSelector(state => state.popupOpener.editUserFriendPopup)
  const friendDataById = useAppSelector(state => state.userFriend)

  const handlerPopupClose = () => {
    dispatch(editFriendPopupIsOpen(false))
  }

  const [friendForm, setFriendForm] = useState<IUserFriend>({
    id: 0,
    name: '',
    phone: '',
  })

  useEffect(() => {
    setFriendForm({
      ...friendForm,
      id: friendDataById.id,
      name: friendDataById.name,
      phone: friendDataById.phone
    })
  }, [popupOpener])

  const handleChangeInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFriendForm({ ...friendForm, [e.target.name]: e.target.value })
  }

  const editFriendById: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault()
    if (friendForm.name !== friendDataById.name || friendForm.phone !== friendDataById.phone) {
      editUserFriendByIdAsync(friendForm, dispatch)
      dispatch(editFriendPopupIsOpen(false))
      dispatch(isAlert({ isOpen: true, alertText: 'Данные изменились' }))
    } else {
      dispatch(isAlert({ isOpen: true, alertText: 'Ни одно поле не изменилось' }))
    }
  }

  return (
    <PopupWithForm isOpen={popupOpener} onClose={handlerPopupClose} onSubmit={editFriendById} title={'Редактировать друга'} buttonText={'Добавить'} name={'edit-friend'}>
      <input className="input-blue" type='text' placeholder='Name' value={friendForm.name} name='name' onChange={handleChangeInput} ></input>
      <input className="input-blue" type='text' placeholder='Phone' value={friendForm.phone} name='phone' onChange={handleChangeInput} ></input>
    </PopupWithForm>
  )
}

export default EditUserFriendPopup
