import express from 'express'
import { getProfileSvg } from './index'
import { renderError, Theme } from './templates'
import { isThemeValid } from './utils'

const app = express()
const port = 5000

app.get('/:id', async (req, res) => {
  const { id } = req.params
  const { theme = 'default', website = 'true', location = 'true' } = req.query

  res.setHeader('Content-Type', 'image/svg+xml')

  try {
    const isWebsiteParamValid = website === 'true' || website === 'false'
    const isLocationParamValid = location === 'true' || location === 'false'

    if (typeof theme !== 'string' || !isThemeValid(theme as string)) {
      throw new Error(`Invalid theme '${theme}'`)
    } else if (website && !isWebsiteParamValid) {
      throw new Error(`Invalid value '${website}' for the website params`)
    } else if (location && !isLocationParamValid) {
      throw new Error(`Invalid value '${location}' for the location params`)
    }

    const svg = await getProfileSvg(Number(id), {
      theme: theme as unknown as Theme,
      website: Boolean(website),
      location: Boolean(location)
    })

    res.send(svg)
  } catch (error) {
    res.send(renderError({ error: (error as Error).message }))
  }
})

app.listen(port, () => {
  console.log(`stackoverflow-readme-profile's api listening at http://localhost:${port}`)
})
