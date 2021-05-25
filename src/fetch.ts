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

const getUserImageAsBase64 = async (url: string): Promise<string> => {
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

    return 'data:image/png;base64,' + buffer.toString('base64')
  } catch (error) {
    throw new Error(`Unable to fetch this user avatar: ${error}`)
  }
}

const getApiRoute = (id: number): string => {
  const token = process.env.SO_API_TOKEN
  return `https://api.stackexchange.com/2.2/users/${id}?site=stackoverflow${token ? `&key=${token}` : ''}`
}

const fetchUser = async (id: number): Promise<User> => {
  try {
    const response = await fetch(getApiRoute(id))

    // decode html entities
    const dataText = await response.text()
    const data = JSON.parse(he.decode(dataText))

    const user = data?.items[0] as UserResponse
    if (!user) throw new Error(`Unable to fetch the user with the id ${id}`)

    const image = await getUserImageAsBase64(user.profile_image)
    const userData = {
      ...user,
      id: user.user_id,
      username: user.display_name,
      reputation: getUserReputation(user.reputation),
      avatar: image,
      badges: user.badge_counts,
      website: user.website_url
    }

    return userData
  } catch (error) {
    throw new Error(error)
  }
}

export default fetchUser
