import axios from "axios"
import { isAlert } from "../store/popupWithAlert"
import { editUser, userAuth } from "../store/userAuthSlice"
import { addUserFriend, deleteUserFriend, editUserFriend, getUserFriends } from "../store/userFriendsSlice"
import { EditUserForm, User, UserFriend } from "../types/types"

const BASE_URL = 'http://localhost:3001'

export const userSignUpAsync = async (editForm: User, dispatch: Function): Promise<void> => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, editForm)
    dispatch(isAlert({ isOpen: true, alertText: `Пользователь ${response.data.user.username} создан` }))
  } catch (error) {
    dispatch(isAlert({ isOpen: true, alertText: `Ошибка` }))
  }
}

export const editUserAsync = async (editForm: EditUserForm, dispatch: Function): Promise<void> => {
  try {
    const response = await axios.patch(`${BASE_URL}/users/${editForm.id}`, (editForm))
    response.data = { email: response.data.email, username: response.data.username }
    dispatch(editUser(response.data))
  } catch (error) {
    dispatch(isAlert({ isOpen: true, alertText: `Ошибка` }))
  }
}

export const userAuthAsync = async (loginForm: User, dispatch: Function): Promise<void> => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, loginForm)
    const userData = {
      accessToken: response.data.accessToken,
      username: response.data.user.username,
      email: response.data.user.email,
      password: loginForm.password,
      id: response.data.user.id,
      auth: true
    }
    dispatch(userAuth(userData))
  } catch (error) {
    dispatch(isAlert({ isOpen: true, alertText: 'Неверный email или password' }))
  }
}

export const rednerUserFriendsAsync = async (userId: number, dispatch: Function): Promise<void> => {
  try {
    const response = await axios.get(`${BASE_URL}/friends?author=${userId}`)
    dispatch(getUserFriends(response.data))
  } catch (error) {
    dispatch(isAlert({ isOpen: true, alertText: `Ошибка` }))
  }
}

export const addUserFriendAsync = async (newFriend: UserFriend, dispatch: Function): Promise<void> => {
  try {
    const response = await axios.post(`${BASE_URL}/friends`, newFriend)
    dispatch(addUserFriend(response.data))
    dispatch(isAlert({ isOpen: true, alertText: `Контакт ${response.data.name} создан` }))
  } catch (error) {
    dispatch(isAlert({ isOpen: true, alertText: `Ошибка` }))
  }
}

export const deleteFriendByIdAsync = async (friendId: number, dispatch: Function): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/friends/${friendId}`)
    dispatch(deleteUserFriend(friendId))
    dispatch(isAlert({ isOpen: true, alertText: `Контакт удален` }))
  } catch (error) {
    dispatch(isAlert({ isOpen: true, alertText: `Ошибка` }))
  }
}

export const editUserFriendByIdAsync = async (userFriend: UserFriend, dispatch: Function): Promise<void> => {
  try {
    const response = await axios.patch(`${BASE_URL}/friends/${userFriend.id}`,
      { name: userFriend.name, phone: userFriend.phone })
    dispatch(editUserFriend(response.data))
  } catch (error) {
    dispatch(isAlert({ isOpen: true, alertText: `Ошибка` }))
  }
}
