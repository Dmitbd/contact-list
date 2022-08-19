import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { User } from "../types/types"
import { useForm } from "react-hook-form"
import { userAuthAsync } from "../api/axios"
import FormInput from "../components/FormInput"
import { requaredField } from "../utils/constants/formTextConstants"
import { useEffect } from "react"

const UserLogIn: React.FC = () => {

  const userSignUp = useAppSelector(state => state.user.email)
  const dispatch = useAppDispatch()
  const { handleSubmit, control, setValue } = useForm<User>({ mode: 'onChange' })

  const onSubmit = (loginForm: User): void => {
    userAuthAsync(loginForm, dispatch)
  }

// если регистрировался заполняет поле email на авторизации
  useEffect(() => {
    if (userSignUp) {
      setValue('email', userSignUp)
    }
  }, [userSignUp])

  return (
    <div className="inputs-container">
      <div>
        <h1 className="text-center text-white mb-4 cursor-default">Введите свои данные для авторизации</h1>

        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>

          <FormInput
            name="email"
            placeholder="email"
            control={control}
            rules={{
              required: requaredField
            }}
          />

          <FormInput
            name="password"
            placeholder="password"
            type="password"
            control={control}
            rules={{
              required: requaredField
            }}
          />

          <input className="btn-blue" type='submit' value='Войти' />
          <Link className="btn-blue" to="/signup">Зарегистрироваться</Link>
        </form>
      </div>
    </div>
  )
}

export default UserLogIn
