import {
  NextFunction, Router, Request, Response
} from 'express'

const router = Router()

export const guarded = (req: Request, res: Response, next: NextFunction): void => {
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

router.get('/auth', guarded, (req, res) => {
  res.status(200).send()
})

export default router
