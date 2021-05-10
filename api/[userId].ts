import { VercelRequest, VercelResponse } from '@vercel/node'
import { getProfileSvg } from '../src'

export default (req: VercelRequest, res: VercelResponse): void => {
  const { userId } = req.query

  if (userId) {
    getProfileSvg(Number(userId as string)).then((svg) => {
      res.setHeader('Content-Type', 'image/svg+xml')
      res.send(svg)
    })
  }
}
