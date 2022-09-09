import { Router } from 'express'
import { getManager } from 'typeorm'
import { PopularTag } from '../../../db/entity/PopularTag'

import { ScoreAmountByTag } from '../../../db/entity/ScoreAmountByTag'
import { ScorePercentileByTag } from '../../../db/entity/ScorePercentileByTag'
import { Logger } from '../../../Logger'
import getScrapedPopularTags from '../../helpers/getScrapedPopularTags'
import { getOptimisedScoreAmountArray } from '../../utils'
import { guarded } from '../auth'

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
  '',
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
  '/:tagName',
  async (req, res) => {
    const manager = getManager()
    const tag = encodeURIComponent(req.params.tagName)

    const scorePercentages = await (await manager.getRepository(ScorePercentileByTag).find({
      where: { tag },
      order: { score: 'DESC' },
      select: ['percentage', 'score']
    }))

    if (scorePercentages.length <= 0) {
      res.status(404).send()
      return
    }

    res.json({
      scorePercentages: scorePercentages.map(
        scorePercentage => [scorePercentage.score, scorePercentage.percentage]
      )
    })
  }
)

router.get(
  '/:tagName/users',
  async (req, res) => {
    const manager = getManager()
    const tag = encodeURIComponent(req.params.tagName)

    const scoreAmounts = await (await manager.getRepository(ScoreAmountByTag).find({
      where: { tag },
      order: { score: 'DESC' },
      select: ['score', 'amount']
    }))

    if (scoreAmounts.length <= 0) {
      res.status(404).send()
      return
    }

    const optimisedScoreAmounts = getOptimisedScoreAmountArray(
      scoreAmounts.map((scoreAmount) => ([scoreAmount.score, scoreAmount.amount]))
    )

    res.json({
      scoreAmounts: optimisedScoreAmounts
    })
  }
)

export default router
