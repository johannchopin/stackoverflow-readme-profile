import express from 'express'
import cors from 'cors'

import { SECONDS_IN_MIN, Template } from './const'
import { getProfileSvg } from './index'

import { renderError, Theme } from './templates'
import { isTemplateValid, isThemeValid } from './utils'
import { initDatabase } from './db/init'
import { getAnalytics } from './analytics'
import scraperRouter from './scrapers/router'

const checkQueryStrings = (query: { theme: string; website?: string; location?: string }): void => {
  const { theme, website, location } = query
  const isWebsiteParamValid = website === 'true' || website === 'false'
  const isLocationParamValid = location === 'true' || location === 'false'

  if (typeof theme !== 'string' || !isThemeValid(theme as string)) {
    throw new Error(`Invalid theme '${theme}'`)
  } else if (website && !isWebsiteParamValid) {
    throw new Error(`Invalid value '${website}' for the website params`)
  } else if (location && !isLocationParamValid) {
    throw new Error(`Invalid value '${location}' for the location params`)
  }
}

const run = async (): Promise<void> => {
  initDatabase()

  const app = express()
  const PORT = 5000
  const CACHE_PERIOD = 10 * SECONDS_IN_MIN // 10mins

  app.use(express.json())
  app.use(cors())

  app.use('/tags-league', scraperRouter)

  app.get('/_analytics', async (req, res) => {
    res.json(await getAnalytics())
  })

  app.get('/:template/:id', async (req, res) => {
    const { id, template } = req.params
    const { theme = 'default', website = 'true', location = 'true' } = req.query

    const templateValid = isTemplateValid(template)
    try {
      if (!templateValid) throw new Error(`Invalid template '${template}'`)

      res.setHeader('Content-Type', 'image/svg+xml')
      res.setHeader('Cache-control', `public, max-age=${CACHE_PERIOD}`)

      // @ts-ignore
      checkQueryStrings({ theme, website, location })

      const svg = await getProfileSvg(
        Number(id),
        template as Template,
        {
          theme: theme as unknown as Theme,
          website: website === 'true',
          location: location === 'true'
        }
      )

      res.send(svg)
    } catch (error) {
      res.send(renderError({ error: (error as Error).message }))
    }
  })

  app.listen(PORT, () => {
    console.log(`stackoverflow-readme-profile's api listening at http://localhost:${PORT}`)
  })
}

run()
