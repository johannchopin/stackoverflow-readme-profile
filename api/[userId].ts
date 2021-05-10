import { NextApiRequest, NextApiResponse } from 'next'
import { getProfileSvg } from '../src'

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const { userId } = req.query

  if (userId) {
    getProfileSvg(Number(userId as string)).then((svg) => {
      res.setHeader('Content-Type', 'image/svg+xml')
      res.send(svg)
    })
  }
}
