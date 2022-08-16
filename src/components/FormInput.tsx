import { useState } from "react"
import { Controller } from "react-hook-form"
import eyeHide from '../images/eye-hide.svg'
import eyeShow from '../images/eye-show.svg'

type FormInputProps = {
  control: any,
  name: string,
  placeholder: string,
  rules: Object,
  type?: string
}

const FormInput: React.FC<FormInputProps> = (props) => {

  const { control, name, placeholder, rules, type } = props

  const [inputType, setInputType] = useState(type)
  const [icon, setIcon] = useState(eyeHide)

  const handleToggleEye = (): void => {
    if (inputType === 'password') {
      setIcon(eyeShow)
      setInputType('text')
    } else {
      setIcon(eyeHide)
      setInputType('password')
    }
  }

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <div className="relative">
          <input 
            className={error ? 'input input_error relative' : 'input'}
            value={value || ''}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            type={inputType}
          />
          {name.includes("password") ? <img onClick={handleToggleEye} className="absolute top-2 right-2 w-6 h-6 cursor-pointer" src={icon} alt={''}></img> : null}

          {error && <span className="text_error">{error.message || 'Error'}</span>}
        </div>
      )}
    />
  )
}

export default FormInput
