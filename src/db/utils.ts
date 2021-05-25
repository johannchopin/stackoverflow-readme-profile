import { getMongoManager } from 'typeorm'
import { MS_IN_DAY } from '../const'

import { User as UserType } from '../types'
import { User } from './entity/User'

export const shouldUpdateUserCache = async (userId: number): Promise<boolean> => {
  const manager = getMongoManager()

  const storedUser = await manager.findOne(User, userId)

  if (storedUser) {
    const shouldUpdate = Date.now() >= storedUser.updatedAt.getMilliseconds() + MS_IN_DAY
    return shouldUpdate
  }

  return true
}

export const storeUser = async (userToInsert: UserType): Promise<void> => {
  const manager = getMongoManager()

  const existingUser = await manager.findOne(User, userToInsert.id)

  const user = existingUser || new User()

  user.id = userToInsert.id
  user.username = userToInsert.username
  user.reputation = userToInsert.reputation
  user.gold = userToInsert.badges.gold
  user.silver = userToInsert.badges.silver
  user.bronze = userToInsert.badges.bronze
  user.location = userToInsert.location
  user.website = userToInsert.website

  if (existingUser) {
    manager.update(User, { id: userToInsert.id }, { ...user })
  } else {
    manager.save(user)
  }
}
