import express from 'express'
import { Template } from './const'
import { getProfileSvg } from './index'
import { renderError, Theme } from './templates'
import { isTemplateValid, isThemeValid } from './utils'

const app = express()
const port = 5000

const checkQueryStrings = (query: {theme: string; website?: string; location?: string}): void => {
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

app.get('/:template/:id', async (req, res) => {
  const { id, template } = req.params
  const { theme = 'default', website = 'true', location = 'true' } = req.query

  const templateValid = isTemplateValid(template)
  try {
    if (!templateValid) throw new Error(`Invalid template '${template}'`)

    res.setHeader('Content-Type', 'image/svg+xml')

    // @ts-ignore
    checkQueryStrings({ theme, website, location })

    const svg = await getProfileSvg(
      Number(id),
      template as Template, {
        theme: theme as unknown as Theme,
        website: Boolean(website),
        location: Boolean(location)
      }
    )

    res.send(svg)
  } catch (error) {
    res.send(renderError({ error: (error as Error).message }))
  }
})

app.listen(port, () => {
  console.log(`stackoverflow-readme-profile's api listening at http://localhost:${port}`)
})
