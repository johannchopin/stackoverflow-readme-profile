import {
  NextFunction, Request, Response
} from 'express'
import { isTagInLeague } from '../utils'

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

// check that a tag is part of the league
export const validTag = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const tagName = req.params.tagName

  if (tagName) {
    if (!(await isTagInLeague(tagName))) {
      res.status(404).send(`The tag ${tagName} is not part of the league`)
      return
    }
  }

  next()
}
