/* eslint-disable camelcase */
import { config } from 'dotenv'
import fetchUser from './fetch'
import { renderError, renderProfile, Theme as ThemeType } from './templates'
import { getUserReputation } from './utils'

export interface Params {
  theme: ThemeType
  website: boolean
  location: boolean
}
export interface Theme {
  colorBg: string
  colorPrimary: string,
  colorSoIcon?: string
}

config()
export const getProfileSvg = async (
  userId: number,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  params: Params
): Promise<string> => {
  try {
    const user = await fetchUser(userId)
    const {
      display_name,
      profile_image,
      website_url,
      badge_counts,
      reputation,
      location,
      ...rest
    } = user

    return renderProfile({
      ...rest,
      avatar: profile_image,
      username: display_name,
      website: params.website ? website_url : undefined,
      location: params.location ? location : undefined,
      badges: badge_counts,
      reputation: getUserReputation(reputation),
      theme: params.theme
    })
  } catch (error) {
    return renderError({ error: (error as Error).message })
  }
}
