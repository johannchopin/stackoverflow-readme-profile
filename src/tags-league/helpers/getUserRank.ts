import fetch from 'node-fetch'
import * as cheerio from 'cheerio'
import { EntityManager } from 'typeorm'
import { MIN_SCORE_TO_BE_IN_LEAGUE, MS_IN_DAY } from '../../const'
import { UserRankByTag } from '../../db/entity/UserRankByTag'
import { User } from '../../types'
import { getUser } from '../../user'
import { Logger } from '../../Logger'
import { getTopPercentage } from '../api/tags/utils'

interface ScrappedTag {
  tag: string
  score: number
}

const getUserSoTagsPageUrl = (user: User, page = 1): string => {
  return `https://stackoverflow.com/users/${user.id}/${user.username}?tab=tags&sort=votes&page=${page}`
}

const scrapTagsScoreInPage = async (pageUrl: string): Promise<ScrappedTag[]> => {
  Logger.log(`scrap tags at ${pageUrl}`)
  try {
    const html = await (await fetch(pageUrl)).text()

    const $ = cheerio.load(html)

    const scrappedTags: ScrappedTag[] = []

    $('#user-tab-tags > .ba .p12').each((index, tagNode) => {
      const tag = $(tagNode).find('a.post-tag').text()
      const scoreNode = $(tagNode).find('> div > .flex--item:nth-of-type(2) .ai-center:first-of-type > div:first-of-type')
      const score = Number(scoreNode.text().replace(',', ''))
      scrappedTags.push({ score, tag })
    })

    return scrappedTags
  } catch (error) {
    return []
  }
}

const getFetchedUserRank = async (
  manager: EntityManager,
  userId: number,
  tag: string
): Promise<UserRankByTag | undefined> => {
  const user = await getUser(userId)
  if (!user) return undefined

  let currentPage = 1
  let scrappedTags: ScrappedTag[] = []
  do {
    // eslint-disable-next-line no-await-in-loop
    scrappedTags = await scrapTagsScoreInPage(getUserSoTagsPageUrl(user, currentPage))

    const match = scrappedTags.find((scrappedTag) => scrappedTag.tag === tag)

    if (match) {
      const userRank = new UserRankByTag()
      userRank.id = userId
      userRank.score = match.score
      userRank.tag = match.tag
      userRank.topPercentage = await getTopPercentage(manager, tag, match.score)
      return manager.save(userRank)
    }

    currentPage += 1
  } while (scrappedTags.length > 0 && scrappedTags[0].score >= MIN_SCORE_TO_BE_IN_LEAGUE)

  return undefined
}

export const getUserRank = async (
  manager: EntityManager,
  userId: number,
  tag: string
): Promise<UserRankByTag | undefined> => {
  const storedUser = await manager.findOne(UserRankByTag, {
    id: userId,
    tag
  })

  if (storedUser) {
    const now = Date.now()
    const lastUpdate = storedUser.updatedAt.getTime()

    const isOlderThanOneDay = now >= lastUpdate + MS_IN_DAY

    if (isOlderThanOneDay) return getFetchedUserRank(manager, userId, tag)
    return storedUser
  }

  return getFetchedUserRank(manager, userId, tag)
}
