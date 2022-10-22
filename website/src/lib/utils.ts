import { SERVER_BASEURL, SO_BASE_URL } from "./constants"
import type { TemplateSettings } from "./stores/user"

export const replaceAll = (str: string, find: string, replace: string): string => {
  return str.split(find).join(replace)
}

export const getProfileCode = (codeTemplate: string, userId: number, path: string): string => {
  return replaceAll(
    replaceAll(codeTemplate, ':id', userId.toString()),
    ':path',
    path
  )
}

export const getRankingBadgeCode = (codeTemplate: string, tagName: string, userId: string, theme: string): string => {
  return replaceAll(
    replaceAll(
      replaceAll(codeTemplate, ':tag', tagName),
      ':id',
      userId
    ),
    ':path',
    getPathToRankingBadge(tagName, userId, theme)
  )
}

export const setClipboard = (text) => { navigator.clipboard.writeText(text) }

export const getPathToProfile = (userId: number, template: string, theme: string, options: TemplateSettings): string => {
  const queryStringsObject = { theme }

  Object.keys(options).forEach((option) => {
    queryStringsObject[option] = options[option].value
  })

  const queryStrings = new URLSearchParams(queryStringsObject).toString()
  return `${SERVER_BASEURL}/${template}/${userId}?${queryStrings}`
}

export const getPathToRankingBadge = (tagName: string, userId: number | string, theme = 'default'): string => {
  const queryStringsObject = { theme }
  const queryStrings = new URLSearchParams(queryStringsObject).toString()

  return `${SERVER_BASEURL}/tags-league-ranking/${tagName}/${userId}?${queryStrings}`
}

export const getUserIdInProfileUrl = (url: string): number => {
  return Number(url.replace(`${SO_BASE_URL}/users/`, '').split('/')[0])
}

export const getPathToUserSOProfilePage = (userId: number | string): string => {
  return 'https://stackoverflow.com/users/' + userId
}