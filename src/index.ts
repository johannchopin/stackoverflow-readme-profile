/* eslint-disable camelcase */
import { config } from 'dotenv'
import fetchUser from './fetch'
import template from './profileTemplate'
import { getUserReputation } from './utils'

import defaultTheme from './themes/default.json'
import darkTheme from './themes/dark.json'

export interface Params {
  website?: boolean
  location?: boolean
}
export interface Theme {
  colorBg: string
  colorPrimary: string
}

const DEFAULT_PARAMS: Params = {
  website: true,
  location: true
}

config()
export const getProfileSvg = async (
  userId: number,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  params: Params = DEFAULT_PARAMS
): Promise<string> => {
  try {
    const user = await fetchUser(userId)
    const {
      display_name,
      profile_image,
      website_url,
      badge_counts,
      reputation,
      ...rest
    } = user

    const theme = darkTheme

    return template({
      ...rest,
      avatar: profile_image,
      username: display_name,
      website: website_url,
      badges: badge_counts,
      reputation: getUserReputation(reputation),
      theme: { ...defaultTheme, ...theme }
    })
  } catch (error) {
    throw new Error(error)
  }
}
