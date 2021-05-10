import { getUserReputation } from '../utils'

describe('Utils functions', () => {
  describe('getUserReputation', () => {
    it('should get the correct reputation format', () => {
      expect(getUserReputation(1_230_000)).toBe('1.2m')
      expect(getUserReputation(235_000)).toBe('235k')
      expect(getUserReputation(35_630)).toBe('35.6k')
      expect(getUserReputation(5_630)).toBe('5,630')
      expect(getUserReputation(630)).toBe('630')
      expect(getUserReputation(3)).toBe('3')
    });
  });
});