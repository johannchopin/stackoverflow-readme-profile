import template from './profileTemplate'

export const getProfileSvg = (userId: number): string => {
  return template({
    avatar: 'https://i.stack.imgur.com/4iGwt.jpg?s=328&g=1',
    username: 'johannchopin',
    reputation: '7,888',
    badges: {
      gold: 6,
      silver: 50,
      bronze: 79
    },
    location: 'Paris, France',
    website: 'https://cv-johannchopin.web.app/'

  })
}
