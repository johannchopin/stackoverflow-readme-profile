import { renderError, renderProfile, renderProfileSmall } from '../templates'

const PROFILE_PARAMS = {
  avatar: 'foobar',
  username: 'foobar',
  reputation: '42k',
  badges: {
    gold: 42,
    silver: 42,
    bronze: 42
  },
  location: 'foobar',
  website: 'foobar'
}

describe('Templates functions', () => {
  describe('error svg template', () => {
    it('should match the snapshot', () => {
      expect(renderError({error: 'Error: Unable to fetch the user with the id 858453669'})).toMatchSnapshot()
    })
  })

  describe('profile svg template', () => {
    it('should match the snapshot', () => {
      expect(renderProfile(PROFILE_PARAMS)).toMatchSnapshot()
    })
  })

  describe('profile-small svg template', () => {
    it('should match the snapshot', () => {
      expect(renderProfileSmall(PROFILE_PARAMS)).toMatchSnapshot()
    })
  })
})