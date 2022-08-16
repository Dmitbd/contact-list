import { Link } from "react-router-dom"
import image from '../images/main-book.svg'

const Home: React.FC = () => {
  return (
    <section className="m-auto pt-8 flex flex-col">
      <h1 className="text-center text-white text-2xl cursor-default">Телефонная книга</h1>
      <img className="m-auto" src={image} alt="телефонная книга"></img>
      <p className="text-white text-white text-center cursor-default">Войти под существующим email</p>
      <Link className="btn-blue" to="/login">Войти</Link>
      <p className="text-white text-white text-center cursor-default">Зарегистрировать новый email</p>
      <Link className="btn-blue" to="/signup">Регистрация</Link>
    </section>
  )
}

export default Home
