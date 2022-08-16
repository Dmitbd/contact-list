import { useNavigate } from "react-router-dom"
import UserFriendsContainer from "../components/UserFriendsContainer"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { addFriendPopupIsOpen, editUserPopupIsOpen } from "../store/openPopupSlice"
import { userExit } from "../store/userAuthSlice"
import edit from '../images/edit.svg'
import arrowLogOut from '../images/arrow-log-out.svg'
import circlePlus from '../images/circle-plus.svg'
import { useState } from "react"

const User: React.FC = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const userAuthData = useAppSelector(state => state.user)

  const [searchInput, setSearchInput] = useState('')

  const handleOpenAddFriendPopup = (): void => {
    dispatch(addFriendPopupIsOpen(true))
  }

  const editUser = (): void => {
    dispatch(editUserPopupIsOpen(true))
  }

  const handleQuitUser = (): void => {
    dispatch(userExit(true))
    navigate('/', { replace: true })
  }

  return (
    <div className="flex flex-col p-12 mx-auto">
      <header className="flex border-b-2 border-white pb-4">
        <div className="w-80 text-white">
          <span className="cursor-default">Ваш профиль:</span>
          <h1 className="text-sky-500 cursor-default">{userAuthData.user.username}</h1>
        </div>
        <div>
          <button onClick={editUser} className="small-btn-blue">
            <img className="m-auto" src={edit} alt='редактировать'></img>
          </button>
          <button onClick={handleQuitUser} className="small-btn-blue">
            <img className="m-auto" src={arrowLogOut} alt='выйти'></img>
          </button>
        </div>
      </header>

      <div className="flex text-white py-4">
        <input className="input-search" placeholder="Имя" onChange={e => setSearchInput(e.target.value)} />
        <button onClick={handleOpenAddFriendPopup} className="small-btn-blue" type="button">
          <img className="m-auto" src={circlePlus} alt='добавить друга'></img>
        </button>
      </div>

      <UserFriendsContainer searchInput={searchInput} />

    </div>
  )
}

export default User
