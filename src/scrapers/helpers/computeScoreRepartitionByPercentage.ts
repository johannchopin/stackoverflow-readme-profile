import { EntityManager, getManager } from 'typeorm'
import { ScorePercentileByTag } from '../../db/entity/ScorePercentileByTag'
import { ScoreAmountItem } from '../ApiService'

const MIN_REPUTATION_TO_BE_IN_LEAGUE = 3

const deleteStoredScorePercentile = async (manager: EntityManager, tag: string): Promise<void> => {
  await manager.createQueryBuilder().delete().from(ScorePercentileByTag).where('tag = :tag', { tag })
    .execute()
}
// scoresDesc -> array of 100 scores like [444, 236, 34, 4, ...]
const storeScorePercentile = async (scoresAsc: number[], tag: string): Promise<void> => {
  const manager = getManager()

  await deleteStoredScorePercentile(manager, tag)

  const entities: ScorePercentileByTag[] = []
  scoresAsc.forEach((score, index) => {
    const percentage = index + 1
    const entity = new ScorePercentileByTag()
    entity.tag = tag
    entity.percentage = percentage
    entity.score = score

    entities.push(entity)
  })

  await manager.save(entities)
}

const computeScoreRepartitionByPercentage = async (
  manager: EntityManager,
  tag: string,
  items: ScoreAmountItem[]
): Promise<void> => {
  const total = items.reduce((totalAcc, item) => {
    const score = item[0]
    const amount = item[1]

    if (score >= MIN_REPUTATION_TO_BE_IN_LEAGUE) return totalAcc + amount
    return totalAcc
  }, 0)

  // array of 100 scores
  const percentileScore: number[] = []
  const step = Math.round(total / 100)
  let count = 0

  items.forEach((item) => {
    const score = item[0]
    const amount = item[1]

    if (score >= MIN_REPUTATION_TO_BE_IN_LEAGUE) {
      const itemCount = count + amount
      const stepOverflowAmount = Math.floor(itemCount / step)
      const stepOverflowRest = itemCount % step

      for (let index = 0; index < stepOverflowAmount; index += 1) {
        percentileScore.push(score)
      }

      count = stepOverflowRest
    }
  })

  await storeScorePercentile(percentileScore, tag)
}

export default computeScoreRepartitionByPercentage
