import { getManager } from 'typeorm'
import { Log } from '../../db/entity/Log'

export const getLogs = async (): Promise<Log[]> => {
  const manager = getManager().getRepository(Log)
  return manager.find(
    {
      order: {
        createdAt: 'DESC'
      },
      skip: 0,
      take: 50
    }
  )
}
