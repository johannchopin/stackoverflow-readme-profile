import { EntityManager } from 'typeorm'
import { PopularTag } from '../../db/entity/PopularTag'

const getStoredTopTags = async (manager: EntityManager): Promise<string[]> => {
  return (await manager.find(PopularTag, {
    select: ['name']
  })).map(entity => entity.name)
}

export default getStoredTopTags
