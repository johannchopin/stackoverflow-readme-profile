export const MY_SO_ID = 8583669
export const API_BASEURL = 'https://stackoverflow-readme-profile.johannchopin.fr'
export const GITHUB_REPO_URL = 'https://github.com/johannchopin/stackoverflow-readme-profile'

export const SELECT_THEME_TITLE_ID = 'selectTheme'

export const MD_CODE_TEMPLATE = `[![user::id's SO profile](${API_BASEURL}/:template/:id)](${GITHUB_REPO_URL})`
export const HTML_CODE_TEMPLATE = `<a href="${GITHUB_REPO_URL}">
  <img src="${API_BASEURL}/:template/:id" alt="user::id's SO profile">
</a>`
