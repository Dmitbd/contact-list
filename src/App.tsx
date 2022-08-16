import PopupWithAddUserFriend from "./components/PopupWithAddUserFriend"
import PopupWithEditUserFriend from "./components/PopupWithEditUserFriend"
import PopupWithFormError from "./components/PopupWithError"
import Providers from "./components/Providers"
import PopupWithEditUser from "./components/PopupWithEditUser"

const App = () => {

  // объеденить слайсы логина и авторизации

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
