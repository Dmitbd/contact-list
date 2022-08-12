import { Link } from "react-router-dom"
import { useAppDispatch } from "../hooks/hooks"
import { IUser } from "../types/types"
import { useForm } from "react-hook-form"
import { userAuthAsync } from "../api/axios"

const UserLogIn: React.FC = () => {

  const dispatch = useAppDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm<IUser>({ mode: "onBlur" })

  const onSubmit = (loginForm: IUser) => {
    userAuthAsync(loginForm, dispatch)
  }

  return (
    <div className="inputs-container">
      <div>
        <h1 className="text-center text-white">Введите свои данные для авторизации</h1>

        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>

          <input className="input-blue" placeholder="email"
            {...register('email', {
              required: true,
              pattern: /.+@.+\..+/i,
            })}
          />
          {errors?.email?.type === 'required' && <p className="err-text">Обязательное поле</p>}
          {errors?.email?.type === 'pattern' && <p className="err-text">Не правильный формат email</p>}

          <input className="input-blue" placeholder="пароль" type="password"
            {...register('password', {
              required: true,
            })}
          />
          {errors?.password?.type === 'required' && <p className="err-text">Обязательное поле</p>}

          <input className="btn-blue" type='submit' value='Войти' />
          <Link className="btn-blue" to="/signup">Зарегистрироваться</Link>
        </form>
      </div>
    </div>
  )
}

export default UserLogIn
