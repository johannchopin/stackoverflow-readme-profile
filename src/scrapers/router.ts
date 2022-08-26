/* eslint-disable newline-per-chained-call */
import {
  NextFunction, Router, Request, Response
} from 'express'
import { body } from 'express-validator'
import { sleep } from '../utils'
import { Auth } from './Auth'
import { computeTagsPercentageScale } from './computeTagsPercentageScale'

const router = Router()

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
  '/compute',
  guarded,
  body('cookie').trim().escape(),
  async (req, res) => {
    const cookie = req.body.cookie

    if (cookie && await Auth.isCookieValid(cookie)) {
      res.status(202).send()

      await sleep(2000) // be sure that cookie valid job is done
      computeTagsPercentageScale(cookie)
      return
    }

    res.status(400).send('Invalid SEDE cookie provided!')
  }
)

router.get('/test', guarded, (req, res) => {
  res.json([])
})

export default router
