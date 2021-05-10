/* eslint-disable camelcase */
import { config } from 'dotenv'
import fetchUser from './fetch'
import { renderProfile } from './profileTemplate'
import { getUserReputation } from './utils'

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

    return renderProfile({
      ...rest,
      avatar: profile_image,
      username: display_name,
      website: website_url,
      badges: badge_counts,
      reputation: getUserReputation(reputation),
      theme: 'dark'
    })
  } catch (error) {
    throw new Error(error)
  }
}
