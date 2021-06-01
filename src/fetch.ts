import fetch from 'node-fetch'
import he from 'he'
import { Badges, User } from './types'
import { getUserReputation } from './utils'

export interface UserResponse {
  'badge_counts': Badges
  'is_employee': boolean
  'reputation': number
  'user_id': number
  'location'?: string
  'website_url': string | ''
  'link': string
  'profile_image': string
  'display_name': string
}

// give back a base64 encoded image
export const fetchUserAvatar = async (url: string): Promise<string> => {
  const urlContainsQueryString = url.includes('?')
  const imgSizeQueryString = '?s=128'

  if (urlContainsQueryString) {
    url = url.replace('?', imgSizeQueryString)
  } else {
    url += imgSizeQueryString
  }

  try {
    const response = await fetch(url)
    const buffer = await response.buffer()

    // TODO: get correct image format
    return 'data:image/png;base64,' + buffer.toString('base64')
  } catch (error) {
    throw new Error(`Unable to fetch this user avatar: ${error}`)
  }
}

const getApiEntryPoint = (id: number): string => {
  const token = process.env.SO_API_TOKEN
  return `https://api.stackexchange.com/2.2/users/${id}?site=stackoverflow${token ? `&key=${token}` : ''}`
}

export const fetchUser = async (id: number): Promise<User> => {
  try {
    const response = await fetch(getApiEntryPoint(id))

    // decode html entities
    const dataText = await response.text()
    const data = JSON.parse(he.decode(dataText))

    const user = data?.items[0] as UserResponse
    if (!user) throw new Error(`Unable to fetch the user with the id ${id}`)

    return {
      id: user.user_id,
      username: user.display_name,
      reputation: getUserReputation(user.reputation),
      badges: user.badge_counts,
      location: user.location,
      avatarLink: user.profile_image,
      website: user.website_url
    }
  } catch (error) {
    throw new Error(error)
  }
}
