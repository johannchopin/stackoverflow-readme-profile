import { getManager } from 'typeorm'
import { Log, LogType } from '../db/entity/Log'

export type ComputationStatus = 'available' | 'busy'

export const getComputationStatus = async (): Promise<ComputationStatus> => {
  const manager = getManager()
  const logs = await manager.getRepository(Log).find({
    order: {
      createdAt: 'DESC'
    },
    take: 5
  })

  // eslint-disable-next-line no-restricted-syntax
  for (const log of logs) {
    if (log.type === LogType.LEAGUE_COMPUTATION_END || log.type === LogType.LEAGUE_COMPUTATION_STOP) {
      return 'available'
    }

    if (log.type === LogType.LEAGUE_COMPUTATION_START) {
      return 'busy'
    }
  }

  return 'available'
}

export const getLastComputationDate = async (): Promise<Date | null> => {
  const manager = getManager()
  const last = await manager.getRepository(Log).findOne({
    where: {
      type: LogType.LEAGUE_COMPUTATION_END
    },
    order: {
      createdAt: 'DESC'
    }
  })

  if (last) return last.createdAt

  return null
}
