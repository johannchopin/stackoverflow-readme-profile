import { getManager } from 'typeorm'
import { PopularTag } from './entity/PopularTag'
import { resetPopularTags } from './utils'

const initPopularTagsTable = async (): Promise<void> => {
  const manager = getManager()
  const storedTags = await manager.find(PopularTag)

  if (storedTags.length === 0) {
    await resetPopularTags()
  }
}

export const initDatabase = async (): Promise<void> => {
  initPopularTagsTable()
}
