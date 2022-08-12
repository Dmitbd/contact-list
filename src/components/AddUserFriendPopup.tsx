import { useForm } from "react-hook-form"
import { addUserFriendAsync } from "../api/axios"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { addFriendPopupIsOpen } from "../store/openPopupSlice"
import { isAlert } from "../store/popupWithAlert"
import { IUserFriend } from "../types/types"
import PopupWithForm from "./PopupWithForm"

const AddUserFriendPopup: React.FC = () => {

  const dispatch = useAppDispatch()
  const popupOpener = useAppSelector(state => state.popupOpener.addUserFriendPopup)
  const author = useAppSelector(state => state.user.user.id)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<IUserFriend>({ mode: "onBlur" })

  const handlerPopupClose = () => {
    dispatch(addFriendPopupIsOpen(false))
  }

  const addNewFriend = (newFriend: IUserFriend) => {
    newFriend = { name: newFriend.name, phone: newFriend.phone, author: author, id: newFriend.id }
    addUserFriendAsync(newFriend, dispatch)
    dispatch(isAlert({ isOpen: true, alertText: 'Друг добавлен' }))
    dispatch(addFriendPopupIsOpen(false))
    reset()
  }

  return (
    <PopupWithForm isOpen={popupOpener} onClose={handlerPopupClose} onSubmit={handleSubmit(addNewFriend)} title={'Добавление друга'} buttonText={'Добавить'} name={'add-friend'}>

      <input className="input-blue" placeholder="имя"
        {...register('name', {
          required: true,
        })}
      />
      {errors?.name?.type === 'required' && <p className="err-text">Обязательное поле</p>}
      <input className="input-blue" placeholder="8-000-000-00-00"
        {...register('phone', {
          required: true,
          pattern: /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g,
          minLength: 15
        })}
      />
      {errors?.phone?.type === 'required' && <p className="err-text">Обязательное поле</p>}
      {errors?.phone?.type === 'pattern' && <p className="err-text">Введите в формате 8-123-123-12-12</p>}
      {errors?.phone?.type === 'minLength' && <p className="err-text">Введите в формате 8-123-123-12-12</p>}

    </PopupWithForm>
  )
}

export default AddUserFriendPopup
