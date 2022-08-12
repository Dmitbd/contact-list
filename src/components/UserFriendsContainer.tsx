import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { editFriendPopupIsOpen } from "../store/openPopupSlice"
import { userFriend } from "../store/userFriendSlice"
import circleClose from '../images/circle-close.svg'
import edit from '../images/edit.svg'
import { IUserFriend } from "../types/types"
import { deleteFriendByIdAsync, rednerUserFriendsAsync } from "../api/axios"
import { addUserFriend } from "../store/userFriendsSlice"

interface IProps {
  searchInput: string
}

const UserFriendsContainer: React.FC<IProps> = ({ searchInput }) => {

  const dispatch = useAppDispatch()
  const userId = useAppSelector(state => state.user.user.id)
  const friends = useAppSelector(state => state.userFriends)

  const filterFriends = friends.filter(friend => {
    return friend.name.toLowerCase().includes(searchInput.toLowerCase())
  })

  const handlePopupOpen = (friendData: IUserFriend) => {
    dispatch(editFriendPopupIsOpen(true))
    dispatch(userFriend(friendData))
  }

  useEffect(() => {
    rednerUserFriendsAsync(userId, dispatch)
  }, [])

  return (
    <div className="text-white">
      {
        filterFriends.map((friend: IUserFriend, index: number) => {
          return (
            <div key={index} className="flex border-b-2 py-2">
              <div className="flex-col">
                <div className="flex">
                  <p className="text-sky-500 w-24">Имя: </p>
                  <p>{friend.name}</p>
                </div>
                <div className="flex">
                  <p className="text-sky-500 w-24">Телефон: </p>
                  <p>{friend.phone}</p>
                </div>
              </div>
              <div className="ml-auto mr-0">
                <button onClick={() => handlePopupOpen(friend)} className="small-btn-blue">
                  <img className="m-auto" src={edit} alt='редактировать друга'></img>
                </button>
                <button onClick={() => deleteFriendByIdAsync(friend.id, dispatch)} className="small-btn-red">
                  <img className="m-auto" src={circleClose} alt='удалить друга'></img>
                </button>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default UserFriendsContainer
