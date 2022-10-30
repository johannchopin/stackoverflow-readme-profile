import { EntityManager } from 'typeorm'
import { Tag } from '../../db/entity/Tag'

const getStoredTags = async (manager: EntityManager): Promise<string[]> => {
  return (await manager.find(Tag, {
    select: ['name']
  })).map(entity => entity.name)
}

export default getStoredTags