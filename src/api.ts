import express from 'express'
import { getProfileSvg } from './index'

const app = express()
const port = 5000

app.get('/:id', async (req, res) => {
  const { id } = req.params
  const svg = await getProfileSvg(Number(id))

  res.setHeader('Content-Type', 'image/svg+xml')
  res.send(svg)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
