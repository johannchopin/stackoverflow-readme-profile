import { getManager } from 'typeorm'
import { MS_IN_DAY } from '../const'

import { User as UserType } from '../types'
import { LogType } from './constants'
import { Avatar } from './entity/Avatar'
import { Log } from './entity/Log'
import { Tag } from './entity/Tag'
import { User } from './entity/User'

export const getUsers = async (): Promise<User[]> => {
  return getManager().find(User)
}

export const getUser = async (userId: number): Promise<User | undefined> => {
  try {
    return getManager().findOne(User, userId)
  } catch (error) {
    return undefined
  }
}

export const shouldUpdateUserCache = (user: User): boolean => {
  return Date.now() >= new Date(user.updatedAt).getTime() + MS_IN_DAY
}

export const getUserAvatar = async (userId: number): Promise<Avatar | undefined> => {
  return getManager().findOne(Avatar, { id: userId })
}

export const storeAvatar = async (userId: number, avatarBase64: string): Promise<Avatar> => {
  const avatar = new Avatar()
  avatar.id = userId
  avatar.base64 = avatarBase64

  try {
    await getManager().save(avatar)
    return avatar
  } catch (error) {
    return avatar
  }
}

export const storeUser = async (userToInsert: UserType): Promise<User> => {
  const user = new User()

  user.id = userToInsert.id
  user.username = userToInsert.username
  user.reputation = userToInsert.reputation
  user.gold = userToInsert.badges.gold
  user.silver = userToInsert.badges.silver
  user.bronze = userToInsert.badges.bronze
  user.location = userToInsert.location
  user.website = userToInsert.website
  user.avatarLink = userToInsert.avatarLink

  try {
    await getManager().save(user)
    return user
  } catch (error) {
    return user
  }
}

export const getTags = async (): Promise<Tag[]> => {
  return getManager().find(Tag)
}

export const storeLog = (type?: LogType, message?: string): Promise<Log> => {
  const manager = getManager()

  const log = new Log()
  log.type = type
  log.message = message

  return manager.save(log)
}
