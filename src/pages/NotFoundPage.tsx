import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {

  const navigate = useNavigate()
  const goBack = () => navigate(-1)

  return (
    <div className="inputs-container text-white">
      <h1>Ой, что-то пошло не так :(</h1>
      <p>Нажмите что-бы вернуться</p>
      <button className="btn-blue" onClick={goBack}>Назад</button>
    </div>
  )
}

export default NotFoundPage
