import fetch from 'node-fetch'
import * as cheerio from 'cheerio'
import TAGS_TO_INCLUDE from '../tags_to_include.json'
import { Logger } from '../../Logger'

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

const getScrapedPopularTags = async (): Promise<string[]> => {
  const fetchedTags = (await Promise.all(TOP_TAG_PAGES.map(pageUrl => getTagsInPage(pageUrl)))).flat()

  TAGS_TO_INCLUDE.forEach(tagToInclude => {
    if (!fetchedTags.includes(tagToInclude)) {
      fetchedTags.push(tagToInclude)
    }
  })

  Logger.log('popular tags fetched')

  return fetchedTags
}

export default getScrapedPopularTags
