require('isomorphic-fetch')

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

const getApiRoute = (id: number): string => {
  return `https://api.stackexchange.com/2.2/users/${id}?site=stackoverflow&key=${process.env.SO_API_TOKEN}`
}

const fetchUser = (id: number, callback:(user?: User) => void): void => {
  fetch(getApiRoute(id))
    .then(response => response.json())
    .then((response) => {
      const user = response?.items[0] as User
      if (user) {
        callback(user)
      } else {
        callback(undefined)
      }
    }).catch(() => {
      callback(undefined)
    })
}

export default fetchUser
