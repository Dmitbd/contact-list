import { Link } from "react-router-dom"

const Home: React.FC = () => {
  return (
    <div className="inputs-container">
      <p className="text-white">Войти под существующим email</p>
      <Link className="btn-blue" to="/login">Войти</Link>
      <p className="text-white">Зарегистрировать новый email</p>
      <Link className="btn-blue" to="/signup">Регистрация</Link>
    </div>
  )
}

export default Home
