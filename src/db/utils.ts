import { getManager } from 'typeorm'
import { MS_IN_DAY } from '../const'

import { User as UserType } from '../types'
import { Avatar } from './entity/Avatar'
import { Log, LogType } from './entity/Log'
import { PopularTag } from './entity/PopularTag'
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

  return getManager().save(avatar)
}

export const storeUser = async (userToInsert: UserType): Promise<User> => {
  const user = new User()
  console.log('storeUser', Date.now())

  user.id = userToInsert.id
  user.username = userToInsert.username
  user.reputation = userToInsert.reputation
  user.gold = userToInsert.badges.gold
  user.silver = userToInsert.badges.silver
  user.bronze = userToInsert.badges.bronze
  user.location = userToInsert.location
  user.website = userToInsert.website
  user.avatarLink = userToInsert.avatarLink

  return getManager().save(user)
}

export const getPopularTags = async (): Promise<PopularTag[]> => {
  return getManager().find(PopularTag)
}

export const storeLog = (type?: LogType, message?: string): Promise<Log> => {
  const manager = getManager()

  const log = new Log()
  log.type = type
  log.message = message

  return manager.save(log)
}
