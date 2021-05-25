export interface Badges {
  gold: number
  silver: number
  bronze: number
}

export interface User {
  id: number
  username: string
  badges: Badges
  reputation: string
  location?: string
  website?: string
  link: string
  avatar: string
}
