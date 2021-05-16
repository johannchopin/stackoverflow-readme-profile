import fetch from 'node-fetch'
import he from 'he'

export interface Badges {
  gold: number
  silver: number
  bronze: number
}
export interface User {
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
  const urlWithoutQueryString = url.split('?')[0]

  try {
    const response = await fetch(`${urlWithoutQueryString}?s=128`)
    const buffer = await response.buffer()

    return 'data:image/png;base64,' + buffer.toString('base64')
  } catch (error) {
    throw new Error(`Unable to fetch this user avatar: ${error}`)
  }
}

const getApiRoute = (id: number): string => {
  return `https://api.stackexchange.com/2.2/users/${id}?site=stackoverflow&key=${process.env.SO_API_TOKEN}`
}

const fetchUser = async (id: number): Promise<User> => {
  try {
    const response = await fetch(getApiRoute(id))

    // decode html entities
    const dataText = await response.text()
    const data = JSON.parse(he.decode(dataText))

    const user = data?.items[0] as User
    if (!user) throw new Error(`Unable to fetch the user with the id ${id}`)

    const image = await getUserImageAsBase64(user.profile_image)
    return {
      ...user,
      profile_image: image
    }
  } catch (error) {
    throw new Error(error)
  }
}

export default fetchUser
