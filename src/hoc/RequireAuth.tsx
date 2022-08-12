import React from "react"
import { Navigate } from "react-router-dom"
import { useAppSelector } from "../hooks/hooks"

interface IProps {
  children: React.ReactNode
}

const RequaierAuth: React.FC<IProps> = ({ children }) => {

  const auth = useAppSelector(state => state.user.auth)

  if (!auth) {
    return <Navigate to='/login' />
  }

  return <>{children}</>
}

export default RequaierAuth
