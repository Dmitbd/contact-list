import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { isAlert } from "../store/popupWithAlert"

// попап с ошибкой
// если isOpen = true добавляет класс видимости, затем убирает его и возвращает hiden для скрытия

const PopupWithError: React.FC = () => {

  const dispatch = useAppDispatch()
  let open = 'invisible'
  const popupWithAlert = useAppSelector(state => state.popupWithAlert)

  if (popupWithAlert.isOpen) {
    open = 'visible'
    setTimeout((): void => {
      dispatch(isAlert({ isOpen: false, alertText: popupWithAlert.alertText }))
    }, 1000)
  }
  if (!popupWithAlert.isOpen) {
    open = 'hiden'
  }

  return (
    <p className={`fixed ${open} bg-white right-8 bottom-8 rounded-lg text-red-600 text-center p-12`}>{popupWithAlert.alertText}</p>
  )
}

export default PopupWithError
