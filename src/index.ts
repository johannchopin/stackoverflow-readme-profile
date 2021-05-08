import template from './profileTemplate'

export const getProfileSvg = (userId: number): string => {
  return template({
    username: 'johannchopin',
    reputation: '7,888',
    location: 'Paris, France',
    website: 'https://cv-johannchopin.web.app/',
    badges: {
      gold: 6,
      silver: 50,
      bronze: 79
    }
  })
}
