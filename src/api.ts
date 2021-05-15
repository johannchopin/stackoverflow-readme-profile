import express from 'express'
import { getProfileSvg } from './index'
import { Theme } from './profileTemplate'
import { isThemeValid } from './utils'

const app = express()
const port = 5000

app.get('/:id', async (req, res) => {
  const { id } = req.params
  const { theme = 'default', website = true, location = true } = req.query

  res.setHeader('Content-Type', 'image/svg+xml')

  if (typeof theme !== 'string' || !isThemeValid(theme as string)) {
    return
  }
  if (typeof website !== 'boolean') {
    return
  }
  if (typeof location !== 'boolean') {
    return
  }

  const svg = await getProfileSvg(Number(id), {
    theme: theme as unknown as Theme,
    website,
    location
  })

  res.send(svg)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
