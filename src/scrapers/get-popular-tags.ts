import fetch from 'node-fetch'
import * as cheerio from 'cheerio'

const TOP_TAG_PAGES = [1, 2, 3].map(pageIndex => `https://stackoverflow.com/tags?page=${pageIndex}&tab=popular`)

const getTagsInPage = async (pageUrl: string): Promise<string[]> => {
  const html = await (await fetch(pageUrl)).text()

  const $ = cheerio.load(html)

  const tags: string[] = []

  $('a.post-tag').each((index, tagNode) => {
    const tag = $(tagNode).text()
    tags.push(encodeURIComponent(tag))
  })

  return tags as string[]
}

const getPopularTags = async (): Promise<string[]> => {
  return (await Promise.all(TOP_TAG_PAGES.map(pageUrl => getTagsInPage(pageUrl)))).flat()
}

export default getPopularTags
