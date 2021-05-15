import express from 'express'
import { getProfileSvg } from './index'
import { renderError, Theme } from './templates'
import { isThemeValid } from './utils'

const app = express()
const port = 5000

app.get('/:id', async (req, res) => {
  const { id } = req.params
  const { theme = 'default', website = true, location = true } = req.query

  res.setHeader('Content-Type', 'image/svg+xml')

  let error = ''

  if (typeof theme !== 'string' || !isThemeValid(theme as string)) {
    error = 'Invalid theme'
  } else if (typeof website !== 'boolean') {
    error = 'Invalid params for website'
  } else if (typeof location !== 'boolean') {
    error = 'Invalid value for the location parame'
  } else {
    const svg = await getProfileSvg(Number(id), {
      theme: theme as unknown as Theme,
      website,
      location
    })

    res.send(svg)
  }

  res.send(renderError({ error }))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
