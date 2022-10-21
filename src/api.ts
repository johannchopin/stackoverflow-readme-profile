import express, { Router } from 'express'
import cors from 'cors'

import { SECONDS_IN_MIN, Template, THEMES } from './const'
import { getProfileSvg } from './index'

import { renderError, renderRankingBadge, Theme } from './templates'
import { isTemplateValid, isThemeValid } from './utils'
import { initDatabase } from './db/init'
import { getAnalytics } from './analytics'
import scraperRouter from './tags-league/api/router'
import { isTagInLeague } from './tags-league/utils'
import { getUserRank } from './tags-league/helpers/getUserRank'
import { getManager } from 'typeorm'

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

  const apiRouter = Router()
  apiRouter.use('/tags-league', scraperRouter)
  apiRouter.get('/analytics', async (req, res) => {
    res.json(await getAnalytics())
  })

  app.use('/api', apiRouter)

  app.get('/tags-league-ranking/:tagName/:userId', async (req, res) => {
    const { tagName, userId } = req.params
    const { theme = 'default' } = req.query
    const manager = getManager()

    try {
      const isUserIdNumber = /^\d+$/.test(userId)
      if (!isUserIdNumber) throw new Error('Given user id should be a number')

      const isTagValid = await isTagInLeague(tagName)
      if (!isTagValid) throw new Error(`The provided tag ${tagName} is not currently part of the Tags League.`)

      const userRank = await getUserRank(manager, Number(userId), tagName)
      if (userRank === undefined) throw new Error("This user doesn't have a sufficient score to be part of the Tags League or isn't a StackOverflow member!")

      res.setHeader('Content-Type', 'image/svg+xml')
      res.setHeader('Cache-control', `public, max-age=${CACHE_PERIOD}`)

      res.send(renderRankingBadge(tagName, userRank.topPercentage, THEMES[theme as Theme] || THEMES.default))
    } catch (error) {
      res.send(renderError({ error: (error as Error).message }))
    }
  })

  app.get('/:template/:userId', async (req, res) => {
    const { userId, template } = req.params
    const { theme = 'default', website = 'true', location = 'true' } = req.query

    const templateValid = isTemplateValid(template)
    try {
      if (!templateValid) throw new Error(`Invalid template '${template}'`)

      res.setHeader('Content-Type', 'image/svg+xml')
      res.setHeader('Cache-control', `public, max-age=${CACHE_PERIOD}`)

      // @ts-ignore
      checkQueryStrings({ theme, website, location })

      const svg = await getProfileSvg(
        Number(userId),
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
