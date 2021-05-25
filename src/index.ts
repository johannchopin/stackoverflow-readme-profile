/* eslint-disable camelcase */
import { config } from 'dotenv'
import { Template } from './const'
import { getUser } from './user'
import {
  renderError,
  renderProfile,
  renderProfileSmall,
  Theme as ThemeType
} from './templates'

export interface Params {
  theme: ThemeType
  website: boolean
  location: boolean
}

config()
export const getProfileSvg = async (
  userId: number,
  type: Template,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  params: Params
): Promise<string> => {
  try {
    const user = await getUser(userId)
    const { website, location } = user

    const renderParams = {
      ...user,
      website: params.website ? website : undefined,
      location: params.location ? location : undefined,
      theme: params.theme
    }

    if (type === 'profile') return renderProfile(renderParams)
    if (type === 'profile-small') return renderProfileSmall(renderParams)
    throw new Error(`Invalid template type '${type}'`)
  } catch (error) {
    return renderError({ error: (error as Error).message })
  }
}
