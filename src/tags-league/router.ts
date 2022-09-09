/* eslint-disable newline-per-chained-call */
import {
  NextFunction, Router, Request, Response
} from 'express'
import { body } from 'express-validator'
import { getManager } from 'typeorm'
import { LogType } from '../db/entity/Log'
import { PopularTag } from '../db/entity/PopularTag'
import { ScoreAmountByTag } from '../db/entity/ScoreAmountByTag'
import { ScorePercentileByTag } from '../db/entity/ScorePercentileByTag'
import { storeLog } from '../db/utils'
import { Logger } from '../Logger'
import { sleep } from '../utils'
import { Auth } from './Auth'
import computeScoreScaleByTag from './helpers/computeScoreScaleByTag'
import getScrapedPopularTags from './helpers/getScrapedPopularTags'
import { getComputationStatus, getLastComputationDate, getOptimisedScoreAmountArray } from './utils'

const router = Router()

let tagsPercentageComputationController = new AbortController()

const guarded = (req: Request, res: Response, next: NextFunction): void => {
  const bearer = req.headers.authorization

  if (!bearer || bearer !== process.env.API_TOKEN) {
    setTimeout(() => {
      // add delay to response to avoid brut force
      res.status(403).send()
    }, 2000)
  } else {
    next()
  }
}

router.post(
  '/',
  guarded,
  body('cookie').trim().escape(),
  async (req, res) => {
    const cookie = req.body.cookie
    try {
      if (cookie && await Auth.isCookieValid(cookie)) {
        const computationStatus = await getComputationStatus()

        if (computationStatus === 'busy') {
          res.status(409).send()
          return
        }

        res.status(202).send()

        const auth = await new Auth(cookie).init()

        await sleep(2000) // be sure that cookie valid job is done

        await storeLog(LogType.LEAGUE_COMPUTATION_START)
        await computeScoreScaleByTag(auth, tagsPercentageComputationController.signal)
        await storeLog(LogType.LEAGUE_COMPUTATION_END)
        return
      }
      res.status(400).send('Invalid SEDE cookie provided!')
    } catch (error) {
      Logger.error('Issue by computing the league')
      await storeLog(LogType.ERROR, error)
      await storeLog(LogType.LEAGUE_COMPUTATION_STOP)
    }
  }
)

router.post(
  '/cancel',
  guarded,
  async (req, res) => {
    tagsPercentageComputationController.signal.addEventListener('aborted', () => {
      tagsPercentageComputationController = new AbortController()
      Logger.log('Computation aborted by client')
      storeLog(LogType.LEAGUE_COMPUTATION_STOP)

      res.status(200).send()
    })

    tagsPercentageComputationController.abort()
  }
)

router.get('/status', async (req, res) => {
  const status = await getComputationStatus()
  const lastComputation = await getLastComputationDate()

  res.status(200).json({ status, lastComputation })
})

router.get(
  '/tags',
  async (req, res) => {
    const manager = getManager()

    const tags = await (await manager.getRepository(PopularTag).find({ select: ['name'] }))

    res.status(200).json(tags.map(tag => decodeURIComponent(tag.name)))
  }
)

router.post(
  '/tags',
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
  '/tags/:tagName',
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
  '/tags/:tagName/users',
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

router.get('/auth', guarded, (req, res) => {
  res.status(200).send()
})

export default router
