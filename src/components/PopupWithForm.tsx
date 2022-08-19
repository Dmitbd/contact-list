interface IPropsPopupWithForm {
  isOpen: boolean,
  onClose: Function,
  onSubmit: Function,
  title: string,
  buttonText: string,
  name: string,
  children: React.ReactNode,
}

const PopupWithForm: React.FC<IPropsPopupWithForm> = (props) => {

  const { isOpen, onClose, onSubmit, title, buttonText, name, children } = props

  let open = ''
// получает определенный isOpen стейт и вешает класс открытия нужного попапа
  if (isOpen) {
    open = 'popup_opened'
  }

  return (
    <div className={`popup ${open} popup__type_${name} `}>
      <div className="flex flex-col m-auto text-center p-8 max-w-sm bg-slate-600 border-solid border-2 relative">
        <h3 className="text-white">{title}</h3>
        <form onSubmit={(e) => onSubmit(e)}>
          {children}
          <button className="btn-blue" type="submit">{buttonText}</button>
        </form>
        <button onClick={() => onClose()} className="small-btn-red absolute -right-6 -top-6">X</button>
      </div>
    </div>
  )
}

export default PopupWithForm
