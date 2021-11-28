import fetch from 'node-fetch'
import { fetchUser } from '../fetch'

const mockFetchResponse = {
  "items": [
    {
      "badge_counts": {
        "bronze": 62,
        "silver": 22,
        "gold": 6
      },
      "account_id": 11726615,
      "is_employee": false,
      "last_modified_date": 1621230900,
      "last_access_date": 1622364743,
      "reputation_change_year": 1143,
      "reputation_change_quarter": 827,
      "reputation_change_month": 309,
      "reputation_change_week": 0,
      "reputation_change_day": 0,
      "reputation": 7327,
      "creation_date": 1504950923,
      "user_type": "registered",
      "user_id": 8583669,
      "location": "Paris, France",
      "website_url": "https://cv-johannchopin.web.app/",
      "link": "https://stackoverflow.com/users/8583669/johannchopin",
      "profile_image": "https://i.stack.imgur.com/4iGwt.jpg?s=128&g=1",
      "display_name": "johannchopin"
    }
  ],
  "has_more": false,
  "quota_max": 300,
  "quota_remaining": 299
}

jest.mock('node-fetch', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve({
      text: () => Promise.resolve(JSON.stringify(mockFetchResponse)),
    })
  )
}))

describe('Fetch functions', () => {
  describe('fetchUser', () => {
    it('should get the correct user data', async () => {
      expect(await fetchUser(42)).toStrictEqual({
        "username": "johannchopin",
        "avatarLink": "https://i.stack.imgur.com/4iGwt.jpg?s=128&g=1",
        "badges": {
          "bronze": 62,
          "gold": 6,
          "silver": 22,
        },
        "id": 8583669,
        "location": "Paris, France",
        "reputation": "7,327",
        "website": "https://cv-johannchopin.web.app/",
      })
    });
  });
});