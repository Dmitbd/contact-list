export type IUser = {
  email: string,
  password: string,
  username?: string,
  id?: number | string
}

export type IUserFriend = {
  name: string
  phone: string
  author?: string | number
  id: number
}

export type EditUserForm = {
  id: number,
  username: string,
  email: string
}
