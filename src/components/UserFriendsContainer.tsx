import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { editFriendPopupIsOpen } from "../store/openPopupSlice"
import { userFriend } from "../store/userFriendSlice"
import { UserFriend } from "../types/types"
import { deleteFriendByIdAsync, rednerUserFriendsAsync } from "../api/axios"
import UserFriendComponent from "./UserFriendComponent"

interface IProps {
  searchInput: string
}

const UserFriendsContainer: React.FC<IProps> = ({ searchInput }) => {

  const dispatch = useAppDispatch()
  const userId = useAppSelector(state => state.user.id)
  const friends = useAppSelector(state => state.userFriends)
  
// принимает value из инпута поиска друзей 
  const filterFriends = friends.filter(friend => {
    return friend.name.toLowerCase().includes(searchInput.toLowerCase())
  })

  const handlePopupOpen = (friendData: UserFriend): void => {
    dispatch(editFriendPopupIsOpen(true))
    dispatch(userFriend(friendData))
  }

  const deleteFriendById = (friendId: number): void => {
    deleteFriendByIdAsync(friendId, dispatch)
  }

  useEffect(() => {
    rednerUserFriendsAsync(userId, dispatch)
  }, [])

  return (
    <div className="text-white">
      {
        filterFriends.map((friend: UserFriend, index: number) => {
          return (
            <UserFriendComponent
              key={index}
              friend={friend}
              handlePopupOpen={handlePopupOpen}
              deleteFriendById={deleteFriendById}
            />
          )
        })
      }
    </div>
  )
}

export default UserFriendsContainer
