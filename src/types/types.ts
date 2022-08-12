export type IUser = {
  email: string,
  password: string,
  username?: string,
  id?: number | string
}

export type IUserFriend = {
  name: string
  phone: string | number
  author?: string | number
  id: string | number
}

export type EditUserForm = {
  id: number,
  username: string,
  email: string
}
