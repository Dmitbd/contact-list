import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { userSignUpAsync } from "../api/axios"
import { useAppDispatch } from "../hooks/hooks"
import { IUser } from "../types/types"

const UserSignUp: React.FC = () => {

  const dispatch = useAppDispatch()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<IUser>({ mode: "onBlur" })

  const userSignUp = (signUpForm: IUser) => {
    userSignUpAsync(signUpForm, dispatch)
    reset()
  }

  return (
    <div className="inputs-container">
      <h1 className="text-center text-white">Введите свои данные для регистрации</h1>
      <form className="flex flex-col" onSubmit={handleSubmit(userSignUp)}>

        <input className="input-blue" placeholder="имя пользователя"
          {...register('username', {
            required: true,
            minLength: 4
          })}
        />
        {errors?.username?.type === 'required' && <p className="err-text">Обязательное поле</p>}
        {errors?.username?.type === 'minLength' && <p className="err-text">Минимум символов: 4</p>}

        <input className="input-blue" placeholder="email"
          {...register('email', {
            required: true,
            pattern: /.+@.+\..+/i,
            minLength: 6
          })}
        />
        {errors?.email?.type === 'required' && <p className="err-text">Обязательное поле</p>}
        {errors?.email?.type === 'pattern' && <p className="err-text">Не правильный формат email</p>}
        {errors?.email?.type === 'minLength' && <p className="err-text">Минимум символов: 6</p>}

        <input className="input-blue" placeholder="пароль" type="password"
          {...register('password', {
            required: true,
            minLength: 6
          })}
        />
        {errors?.password?.type === 'required' && <p className="err-text">Обязательное поле</p>}
        {errors?.password?.type === 'minLength' && <p className="err-text">Минимум символов: 6</p>}


        <input className="btn-blue" type='submit' value='Зарегистрировать' />
        <Link className="btn-blue" to="/login">Авторизоваться</Link>
      </form>
    </div>
  )
}

export default UserSignUp
