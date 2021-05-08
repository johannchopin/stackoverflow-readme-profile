import fetch from 'node-fetch'

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

const getUserImageAsBase64 = (url: string, callback: (image: string) => void): void => {
  const urlWithoutQueryString = url.split('?')[0]

  fetch(`${urlWithoutQueryString}?s=128`)
    .then(response => response.buffer())
    .then(buf => {
      callback('data:image/;base64,' + buf.toString('base64'))
    })
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
        getUserImageAsBase64(user.profile_image, (image) => {
          callback({ ...user, profile_image: image })
        })
      } else {
        callback(undefined)
      }
    }).catch(() => {
      callback(undefined)
    })
}

export default fetchUser
