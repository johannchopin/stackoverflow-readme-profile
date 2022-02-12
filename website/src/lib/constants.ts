export const MY_SO_ID = 8583669
export const SO_BASE_URL = 'https://stackoverflow.com'
export const MY_SO_PROFILE_URL = `${SO_BASE_URL}/users/8583669/johannchopin`
export const API_BASEURL = 'https://stackoverflow-readme-profile.johannchopin.fr'
export const GITHUB_REPO_USER = 'johannchopin'
export const GITHUB_REPO_NAME = 'stackoverflow-readme-profile'
export const GITHUB_REPO_URL = `https://github.com/${GITHUB_REPO_USER}/${GITHUB_REPO_NAME}`

export const SO_PROFILE_URL_REGEXP = /^https:\/\/stackoverflow\.com\/users\/[0-9]+\d\/[a-z]+/g

export const SELECT_THEME_TITLE_ID = 'selectTheme'

export const MD_CODE_TEMPLATE = `[![user::id's SO profile](:path)](${GITHUB_REPO_URL})`
export const HTML_CODE_TEMPLATE = `<a href="${GITHUB_REPO_URL}">
  <img src=":path" alt="user::id's SO profile">
</a>`
