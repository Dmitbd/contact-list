import axios from "axios"
import { isAlert } from "../store/popupWithAlert"
import { editUser, userAuth } from "../store/userAuthSlice"
import { addUserFriend, deleteUserFriend, editUserFriend, getUserFriends } from "../store/userFriendsSlice"
import { EditUserForm, IUser, IUserFriend } from "../types/types"

const BASE_URL = 'http://localhost:3001'

export const userSignUpAsync = async (editForm: IUser, dispatch: Function): Promise<void> => {
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

export const userAuthAsync = async (loginForm: IUser, dispatch: Function): Promise<void> => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, loginForm)
    dispatch(userAuth(response.data))
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

export const addUserFriendAsync = async (newFriend: IUserFriend, dispatch: Function): Promise<void> => {
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

export const editUserFriendByIdAsync = async (userFriend: IUserFriend, dispatch: Function): Promise<void> => {
  try {
    const response = await axios.patch(`${BASE_URL}/friends/${userFriend.id}`,
      { name: userFriend.name, phone: userFriend.phone })
    dispatch(editUserFriend(response.data))
  } catch (error) {
    dispatch(isAlert({ isOpen: true, alertText: `Ошибка` }))
  }
}
