import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { userSignUpAsync } from "../api/axios"
import FormInput from "../components/FormInput"
import { useAppDispatch } from "../hooks/hooks"
import { User } from "../types/types"
import { emailIsNotCorrect, minLengthIsSix, minLengthIsTwo, passwordDoNotMatch, requaredField } from "../utils/constants/formTextConstants"

const UserSignUp: React.FC = () => {

  const dispatch = useAppDispatch()

  const { handleSubmit, control, reset, watch } = useForm<User>({ mode: 'onChange' })

  const userSignUp = (signUpForm: User): void => {
    userSignUpAsync(signUpForm, dispatch)
    reset()
  }

  return (
    <div className="inputs-container">
      <h1 className="text-center text-white mb-4 cursor-default">Введите свои данные для регистрации</h1>
      <form className="flex flex-col" onSubmit={handleSubmit(userSignUp)} >

        <FormInput
          name="username"
          placeholder="username"
          control={control}
          rules={{
            required: requaredField,
            minLength: { value: 2, message: minLengthIsTwo }
          }}
        />

        <FormInput
          name="email"
          placeholder="email"
          control={control}
          rules={{
            required: requaredField,
            pattern: { value: /.+@.+\..+/i, message: emailIsNotCorrect },
            minLength: { value: 6, message: minLengthIsSix }
          }}
        />

        <FormInput
          name="password"
          placeholder="password"
          type="password"
          control={control}
          rules={{
            required: requaredField,
            minLength: { value: 6, message: minLengthIsSix }
          }}
        />

        <FormInput
          name="repeat password"
          placeholder="repeat password"
          type="password"
          control={control}
          rules={{
            required: requaredField,
            validate: (value: string) => value === watch('password') || passwordDoNotMatch
          }}
        />

        <input className="btn-blue" type='submit' value='Зарегистрировать' />
        <Link className="btn-blue" to="/login">Авторизоваться</Link>
      </form>
    </div>
  )
}

export default UserSignUp
