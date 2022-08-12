import { useEffect, useState } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import RequaierAuth from "../hoc/RequireAuth"
import { useAppSelector } from "../hooks/hooks"
import Home from "../pages/Home"
import NotFoundPage from "../pages/NotFoundPage"
import User from "../pages/User"
import UserLogIn from "../pages/UserLogIn"
import UserSignUp from "../pages/UserSignUp"

const Providers: React.FC = () => {

  const userAuthData = useAppSelector(state => state.user)
  const navigate = useNavigate()

  const [paths, setPaths] = useState<string>('')
  useEffect(() => {
    if (userAuthData.auth) {
      setPaths(`/user/:id${userAuthData.user.id}`)
      navigate(`/user/:id${userAuthData.user.id}`)
    }
  }, [userAuthData])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<UserLogIn />} />
      <Route path="/signup" element={<UserSignUp />} />
      <Route path={`${paths}`} element={<RequaierAuth children={<User />} />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default Providers
