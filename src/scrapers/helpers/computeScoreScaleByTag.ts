import { EntityManager, getManager } from 'typeorm'
import { ScoreAmountByTag } from '../../db/entity/ScoreAmountByTag'
import { Logger } from '../../Logger'
import { ApiService, ScoreAmountItem } from '../ApiService'
import { Auth } from '../Auth'
import computeScoreRepartitionByPercentage from './computeScoreRepartitionByPercentage'
import getStoredTopTags from './getStoredTopTags'

export type AmountEntry = [number, number]

const deleteScoreAmountItemsInTable = async (manager: EntityManager, tag: string): Promise<void> => {
  await manager.createQueryBuilder().delete().from(ScoreAmountByTag).where('tag = :tag', { tag })
    .execute()
}

const insertScoreAmountItemsInTable = async (
  manager: EntityManager,
  tag: string,
  items: ScoreAmountItem[]
): Promise<void> => {
  const topUsers: ScoreAmountByTag[] = []

  await deleteScoreAmountItemsInTable(manager, tag)

  Logger.log('score amount cleared for tag: ' + tag)

  items.forEach(item => {
    const scoreAmountByTag = new ScoreAmountByTag()
    scoreAmountByTag.score = item[0]
    scoreAmountByTag.amount = item[1]
    scoreAmountByTag.tag = tag

    topUsers.push(scoreAmountByTag)
  })

  await manager.save(topUsers, { chunk: 1000 })
  Logger.log(`Store score amounts for tag: ${tag}`)
}

const computeScoreScaleByTag = async (auth: Auth, signal: AbortSignal): Promise<void> => {
  Logger.log('Start tags scraping')
  const manager = getManager()

  const api = new ApiService(auth)

  // eslint-disable-next-line no-restricted-syntax
  for (const tag of await getStoredTopTags(manager)) {
    if (!signal.aborted) {
      // eslint-disable-next-line no-await-in-loop
      const scoreAmountItems = await api.getAmountUsersByScoreByTag(decodeURIComponent(tag), signal)

      if (!signal.aborted && scoreAmountItems) {
        insertScoreAmountItemsInTable(manager, tag, scoreAmountItems)
        computeScoreRepartitionByPercentage(manager, tag, scoreAmountItems)
      }
    }
  }

  if (signal.aborted) signal.dispatchEvent(new Event('aborted'))
}

export default computeScoreScaleByTag
