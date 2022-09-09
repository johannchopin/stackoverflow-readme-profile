import { EntityManager } from 'typeorm'
import { ScoreAmountByTag } from '../../../db/entity/ScoreAmountByTag'
import { ScorePercentileByTag } from '../../../db/entity/ScorePercentileByTag'

export const getScorePercentageForTag = async (
  manager: EntityManager,
  tag: string
): Promise<[number, number][]> => {
  return (await manager.getRepository(ScorePercentileByTag).find({
    where: { tag },
    order: { score: 'DESC' },
    select: ['percentage', 'score']
  })).map((scorePercentile) => [scorePercentile.score, scorePercentile.percentage])
}

export const getScoreAmountsForTag = async (
  manager: EntityManager,
  tag: string
): Promise<[number, number][]> => {
  return (await manager.getRepository(ScoreAmountByTag).find({
    where: { tag },
    order: { score: 'DESC' },
    select: ['score', 'amount']
  })).map((scorePercentile) => [scorePercentile.score, scorePercentile.amount])
}
