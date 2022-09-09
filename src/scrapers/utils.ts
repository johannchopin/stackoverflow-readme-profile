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
    if (log.type === LogType.LEAGUE_COMPUTATION_END
      || log.type === LogType.LEAGUE_COMPUTATION_STOP
      || log.type === LogType.SERVER_START) {
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

const roundToNearestX = (value: number, x: number): number => Math.round(value / x) * x

const getOptimisedScoreValue = (score: number): number => {
  if (score > 4000) return roundToNearestX(score, 200)
  if (score > 1000) return roundToNearestX(score, 100)
  if (score > 200) return roundToNearestX(score, 20)
  if (score > 100) return roundToNearestX(score, 10)
  if (score > 50) return roundToNearestX(score, 2)
  return score
}

export const getOptimisedScoreAmountArray = (scoreAmounts: number[][]): number[][] => {
  // key in score and value is amount
  const scoreAmountOptimised: { [key: number]: number } = {}

  scoreAmounts.forEach(scoreAmount => {
    const [score, amount] = scoreAmount

    const optimisedScore = getOptimisedScoreValue(score)

    if (!(optimisedScore in scoreAmountOptimised)) {
      scoreAmountOptimised[optimisedScore] = 0
    }

    scoreAmountOptimised[optimisedScore] += amount
  })

  const optimised: number[][] = []

  Object.keys(scoreAmountOptimised).forEach((score) => {
    const amount = scoreAmountOptimised[Number(score)]
    optimised.push([Number(score), amount])
  })

  return optimised.sort(([scoreA], [scoreB]) => scoreB - scoreA)
}
