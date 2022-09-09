import { EntityManager, getManager } from 'typeorm'
import { MIN_SCORE_TO_BE_IN_LEAGUE } from '../../const'
import { ScorePercentileByTag } from '../../db/entity/ScorePercentileByTag'
import { ScoreAmountItem } from '../ApiService'

export interface PercentileScore {
  percentage: number
  score: number
}

const deleteStoredScorePercentile = async (manager: EntityManager, tag: string): Promise<void> => {
  await manager.createQueryBuilder().delete().from(ScorePercentileByTag).where('tag = :tag', { tag })
    .execute()
}

const storeScorePercentile = async (
  percentileScores: { [percentage: string]: number },
  tag: string
): Promise<void> => {
  const manager = getManager()

  await deleteStoredScorePercentile(manager, tag)

  const entities: ScorePercentileByTag[] = []
  Object.keys(percentileScores).forEach((percentage) => {
    const entity = new ScorePercentileByTag()
    entity.tag = tag
    entity.percentage = Number(percentage)
    entity.score = percentileScores[percentage]

    entities.push(entity)
  })

  await manager.save(entities)
}

const computeScoreRepartitionByPercentage = async (
  tag: string,
  items: ScoreAmountItem[]
): Promise<void> => {
  const total = items.reduce((totalAcc, item) => {
    const score = item[0]
    const amount = item[1]

    if (score >= MIN_SCORE_TO_BE_IN_LEAGUE) return totalAcc + amount
    return totalAcc
  }, 0)

  const percentileScore: PercentileScore[] = []
  const step = Math.round(total / 100)
  let count = 0
  let percentage = 1

  items.forEach((item) => {
    const score = item[0]
    const amount = item[1]

    if (score >= MIN_SCORE_TO_BE_IN_LEAGUE) {
      const itemCount = count + amount
      const stepOverflowAmount = Math.floor(itemCount / step)
      const stepOverflowRest = itemCount % step

      for (let index = 0; index < stepOverflowAmount; index += 1) {
        percentileScore.push({ percentage, score })
        percentage += 1
      }

      count = stepOverflowRest
    }
  })

  // at this point there is multiple top percentage with the same score
  // we want to avoid duplicates by having only one percentage with a given score
  const percentileScoreWithoutDuplicate: { [percentage: string]: number } = {}
  percentileScore.reverse()

  percentileScore.forEach(percentileScoreValue => {
    const { score } = percentileScoreValue
    const percentileScoreExists = Object.values(percentileScoreWithoutDuplicate).includes(score)
    if (!percentileScoreExists) {
      percentileScoreWithoutDuplicate[percentileScoreValue.percentage] = score
    }
  })

  await storeScorePercentile(percentileScoreWithoutDuplicate, tag)
}

export default computeScoreRepartitionByPercentage
