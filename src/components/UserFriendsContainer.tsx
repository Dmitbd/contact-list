import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { editFriendPopupIsOpen } from "../store/openPopupSlice"
import { userFriend } from "../store/userFriendSlice"
import { IUserFriend } from "../types/types"
import { deleteFriendByIdAsync, rednerUserFriendsAsync } from "../api/axios"
import UserFriend from "./UserFriend"

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

  const deleteFriendById = (friendId: string | number) => {
    deleteFriendByIdAsync(friendId, dispatch)
  }

  useEffect(() => {
    rednerUserFriendsAsync(userId, dispatch)
  }, [])

  return (
    <div className="text-white">
      {
        filterFriends.map((friend: IUserFriend, index: number) => {
          return (
            <UserFriend
              key={index}
              friend={friend}
              handlePopupOpen={handlePopupOpen}
              deleteFriendById={deleteFriendById} />
          )
        })
      }
    </div>
  )
}

export default UserFriendsContainer
