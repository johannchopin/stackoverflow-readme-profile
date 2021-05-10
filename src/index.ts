/* eslint-disable camelcase */
import { config } from 'dotenv'
import fetchUser from './fetch'
import template from './profileTemplate'
import { getUserReputation } from './utils'

export interface Params {
  website?: boolean
  location?: boolean
}

const DEFAULT_PARAMS: Params = {
  website: true,
  location: true
}

config()
export const getProfileSvg = async (
  userId: number,
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

    console.log(params)

    return template({
      ...rest,
      avatar: profile_image,
      username: display_name,
      website: website_url,
      badges: badge_counts,
      reputation: getUserReputation(reputation)
    })
  } catch (error) {
    throw new Error(error)
  }
}
