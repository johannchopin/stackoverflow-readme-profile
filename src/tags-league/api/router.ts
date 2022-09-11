/* eslint-disable newline-per-chained-call */
import { Router } from 'express'
import { body } from 'express-validator'
import { LogType } from '../../db/entity/Log'
import { storeLog } from '../../db/utils'
import { Logger } from '../../Logger'
import { sleep } from '../../utils'
import { Auth } from '../Auth'
import computeScoreScaleByTag from '../helpers/computeScoreScaleByTag'
import { getComputationStatus, getLastComputationDate } from '../utils'
import { guarded } from './middlewares'
import tagsRouter from './tags/router'

const router = Router()
router.use('/tags', tagsRouter)

let tagsPercentageComputationController = new AbortController()

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
      res.status(500).send()
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

router.get('/auth', guarded, (req, res) => {
  res.status(200).send()
})

export default router
