export const MY_SO_ID = 8583669
export const SO_BASE_URL = 'https://stackoverflow.com'
export const MY_SO_PROFILE_URL = `${SO_BASE_URL}/users/8583669/johannchopin`
export const SERVER_BASEURL = import.meta.env.VITE_API_BASEURL
export const API_BASEURL = SERVER_BASEURL + '/api'
export const SCORE_COMPUTATION_INFOS = "https://meta.stackoverflow.com/questions/280818/how-are-tag-scores-calculated"
export const SO_USER_TAGS_URL = 'https://stackoverflow.com/users/current?tab=tags&sort=votes'

export const GITHUB_REPO_USER = 'johannchopin'
export const GITHUB_REPO_NAME = 'stackoverflow-readme-profile'
export const GITHUB_REPO_URL = `https://github.com/${GITHUB_REPO_USER}/${GITHUB_REPO_NAME}`

export const OPENAPI_DOC_URL = "https://stackoverflow-readme-profile.johannchopin.fr/api-documentation/"

export const ADD_TAG_ISSUE_LINK = GITHUB_REPO_URL + '/issues/new?assignees=johannchopin&labels=tag-proposition&template=ADD-TAG-TO-TAGS-LEAGUE.yml&title=Tag+proposition%3A+tagname'
export const NEW_QUESTION_ISSUE_LINK = GITHUB_REPO_URL + '/issues/new?assignees=johannchopin&labels=question&template=QUESTION.yml&title=Question%3A+'

export const LICENSE_URL = GITHUB_REPO_URL + '/blob/main/LICENSE.txt'
export const CONTRIBUTORS_URL = GITHUB_REPO_URL + '/graphs/contributors'
export const SEDE_QUERY_URL = GITHUB_REPO_URL + "/blob/main/src/tags-league/SedeQueries/count_users_by_score_of_a_specific_tag.sql"
export const STATIC_TAGS_URL = GITHUB_REPO_URL + "/blob/main/src/tags-league/TAGS.json"

export const SO_PROFILE_URL_REGEXP = /^https:\/\/stackoverflow\.com\/users\/[0-9]+\d\/[a-z]+/g

export const SELECT_THEME_TITLE_ID = 'selectTheme'

export const MD_CODE_PROFILE_TEMPLATE = `[![user::id's SO profile](:path)](${GITHUB_REPO_URL})`
export const HTML_CODE_PROFILE_TEMPLATE = `<a href="${GITHUB_REPO_URL}">
  <img src=":path" alt="user::id's SO profile">
</a>`

export const MD_CODE_RANKING_TEMPLATE = `[![user::id's ranking for :tag](:path)](https://stackoverflow-readme-profile.vercel.app/tags-league/:tag/users/:id)`
export const HTML_CODE_RANKING_TEMPLATE = `<a href="https://stackoverflow-readme-profile.vercel.app/tags-league/:tag/users/:id">
  <img src=":path" alt="user::id's SO ranking for :tag">
</a>`
