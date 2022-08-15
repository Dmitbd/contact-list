import AddUserFriendPopup from "./components/AddUserFriendPopup"
import EditUserFriendPopup from "./components/EditUserFriendPopup"
import EditUserPopup from "./components/EditUserPopup"
import PopupWithFormError from "./components/PopupWithError"
import Providers from "./components/Providers"

const App = () => {

  // объеденить слайсы логина и авторизации

  return (
    <div className="bg-zinc-800 flex w-full m-auto">
      <Providers />
      <EditUserFriendPopup />
      <AddUserFriendPopup />
      <EditUserPopup />
      <PopupWithFormError />
    </div>
  )
}

export default App
