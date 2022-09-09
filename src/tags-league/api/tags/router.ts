import { Router } from 'express'
import { getManager } from 'typeorm'
import { PopularTag } from '../../../db/entity/PopularTag'

import { Logger } from '../../../Logger'
import getScrapedPopularTags from '../../helpers/getScrapedPopularTags'
import { getUserRank } from '../../helpers/getUserRank'
import { guarded, validTag } from '../middlewares'
import { getScoreAmountsForTag, getScorePercentageForTag } from './utils'

const router = Router()

router.get(
  '/',
  async (req, res) => {
    const manager = getManager()

    const tags = await (await manager.getRepository(PopularTag).find({ select: ['name'] }))

    res.status(200).json(tags.map(tag => decodeURIComponent(tag.name)))
  }
)

router.post(
  '/',
  guarded,
  async (req, res) => {
    const scrapedTags = await getScrapedPopularTags()

    const manager = getManager()

    manager.getRepository(PopularTag).clear()

    const tags: PopularTag[] = scrapedTags.map((fetchedTag, index) => {
      const tag = new PopularTag()
      tag.id = index
      tag.name = fetchedTag
      return tag
    })

    manager.save(tags)

    Logger.log('Top tags stored in DB')

    res.status(202).json(scrapedTags)
  }
)

router.get(
  '/:tagName/scorePercentages',
  validTag,
  async (req, res) => {
    const manager = getManager()
    const tag = encodeURIComponent(req.params.tagName)

    const scorePercentages = await getScorePercentageForTag(manager, tag)

    if (scorePercentages.length <= 0) {
      res.status(404).send()
      return
    }

    res.json(scorePercentages)
  }
)

router.get(
  '/:tagName/users/repartitionByScore',
  validTag,
  async (req, res) => {
    const manager = getManager()
    const tag = encodeURIComponent(req.params.tagName)

    const [scoreAmounts, scorePercentages] = await Promise.all([
      getScoreAmountsForTag(manager, tag),
      getScorePercentageForTag(manager, tag)
    ])

    const percentages: number[] = []
    const minScores: number[] = []
    const userAmounts: number[] = []

    scorePercentages.forEach(([score, percentage]) => {
      minScores.push(score)
      percentages.push(percentage)
    })

    let scoreAmountsIndex = 0
    minScores.forEach((minScore, index) => {
      while (scoreAmounts[scoreAmountsIndex][0] >= minScore) {
        if (userAmounts[index] === undefined) userAmounts[index] = 0
        userAmounts[index] += scoreAmounts[scoreAmountsIndex][1]
        scoreAmountsIndex += 1
      }
    })

    if (scoreAmounts.length <= 0) {
      res.status(404).send()
      return
    }

    res.json({
      percentageAmounts: percentages.map((percentage, index) => [percentage, userAmounts[index]])
    })
  }
)

router.get(
  '/:tagName/users/:userId',
  validTag,
  async (req, res) => {
    const manager = getManager()
    const tag = encodeURIComponent(req.params.tagName)
    const userId = req.params.userId

    getUserRank(manager, Number(userId), tag)

    res.json({})
  }
)

export default router
