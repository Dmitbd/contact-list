import PopupWithAddUserFriend from "./components/PopupWithAddUserFriend"
import PopupWithEditUserFriend from "./components/PopupWithEditUserFriend"
import PopupWithFormError from "./components/PopupWithError"
import Providers from "./components/Providers"
import PopupWithEditUser from "./components/PopupWithEditUser"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./hooks/hooks"
import { userAuthAsync } from "./api/axios"
import { User } from "./types/types"

const App = () => {

  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (localStorage.getItem('email') && localStorage.getItem('password')) {
      const email = localStorage.getItem('email')
      const password = localStorage.getItem('password')
      const userData: User = {
        email: `${email}`,
        password: `${password}`
      }
      userAuthAsync(userData, dispatch)
    }
  }, [])

  return (
    <div className="bg-zinc-800 flex w-full m-auto">
      <Providers />
      <PopupWithAddUserFriend />
      <PopupWithEditUserFriend />
      <PopupWithEditUser />
      <PopupWithFormError />
    </div>
  )
}

export default App
