import fetch from 'node-fetch'

const PATH_TO_TAGS = 'https://raw.githubusercontent.com/johannchopin/stackoverflow-readme-profile/main/src/tags-league/TAGS.json'

export const fetchTagsFromGithub = async (): Promise<string[]> => {
  return (await fetch(PATH_TO_TAGS)).json()
}
