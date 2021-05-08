/* eslint-disable camelcase */
import { config } from 'dotenv'
import fetchUser from './fetch'
import template from './profileTemplate'

export interface Params {
  website?: boolean
  location?: boolean
}

const DEFAULT_PARAMS: Params = {
  website: true,
  location: true
}

config()
export const getProfileSvg = (
  userId: number,
  callback:(svg?: string) => void,
  params: Params = DEFAULT_PARAMS
): void => {
  fetchUser(userId, (user) => {
    if (user) {
      const {
        display_name,
        profile_image,
        website_url,
        badge_counts,
        reputation,
        ...rest
      } = user
      callback(template({
        ...rest,
        avatar: profile_image,
        username: display_name,
        website: website_url,
        badges: badge_counts,
        reputation: reputation + ''
      }))
    }

    callback()
  })
}
