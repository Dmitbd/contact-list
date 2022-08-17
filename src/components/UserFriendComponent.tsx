import circleClose from '../images/circle-close.svg'
import edit from '../images/edit.svg'
import { UserFriend } from "../types/types"

type UserFriendProps = {
  friend: {
    name: string,
    phone: string,
    id: number,
  }
  handlePopupOpen: (friendData: UserFriend) => void
  deleteFriendById: (friendId: number) => void
}

const UserFriendComponent: React.FC<UserFriendProps> = (props) => {

  const { friend, handlePopupOpen, deleteFriendById } = props
  const { name, phone, id } = friend

  return (
    <div className="flex border-b-2 py-2">
      <div className="flex-col cursor-default">
        <div className="flex">
          <p className="text-sky-500 w-24">Имя: </p>
          <p>{name}</p>
        </div>
        <div className="flex">
          <p className="text-sky-500 w-24">Телефон: </p>
          <p>{phone}</p>
        </div>
      </div>
      <div className="ml-auto mr-0">
        <button onClick={() => handlePopupOpen(friend)} className="small-btn-blue">
          <img className="m-auto" src={edit} alt='редактировать друга'></img>
        </button>
        <button onClick={() => deleteFriendById(id)} className="small-btn-red">
          <img className="m-auto" src={circleClose} alt='удалить друга'></img>
        </button>
      </div>
    </div>
  )
}

export default UserFriendComponent
