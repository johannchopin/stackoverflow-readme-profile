import { renderError, renderProfile, renderProfileSmall } from '../templates'

describe('Templates functions', () => {
  describe('error svg template', () => {
    it('should match the snapshot', () => {
      expect(renderError({error: 'Error: Unable to fetch the user with the id 858453669'})).toMatchSnapshot()
    })
  })

  describe('profile svg template', () => {
    it('should match the snapshot', () => {
      expect(renderProfile({
        avatarLink: 'foobar',
        username: 'foobar',
        reputation: '42k',
        badges: {
          gold: 42,
          silver: 42,
          bronze: 42
        },
        location: 'foobar',
        website: 'foobar'
      })).toMatchSnapshot()
    })
  })

  describe('profile-small svg template', () => {
    it('should match the snapshot', () => {
      expect(renderProfileSmall({
        avatarLink: 'foobar',
        username: 'foobar',
        reputation: '42k',
        badges: {
          gold: 42,
          silver: 42,
          bronze: 42
        },
        location: 'foobar',
        website: 'foobar'
      })).toMatchSnapshot()
    })
  })
})