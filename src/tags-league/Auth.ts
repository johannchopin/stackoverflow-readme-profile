import fetch, { Headers } from 'node-fetch'
import { Logger } from '../Logger'
import { QUERY } from './SedeQueries/constants'

export class Auth {
  constructor(public cookie: string) {
    return this
  }

  public init = async (): Promise<Auth> => {
    return this
  }

  public isValid = async (): Promise<boolean> => {
    if (this.cookie) {
      const isValid = await Auth.isCookieValid(this.cookie)

      if (!isValid) {
        Logger.log('Provided cookie expired')
      }

      return isValid
    }

    return false
  }

  static isCookieValid = async (cookie: string): Promise<boolean> => {
    const headers = new Headers({ Cookie: cookie })
    const params = new URLSearchParams()
    params.append('tagName', 'foobar')

    const jobIdResponse = await fetch(
      QUERY.CHECK_AUTH_COOKIE,
      {
        method: 'POST',
        headers,
        body: params
      }
    )

    const invalidCookie = await (await jobIdResponse.json()).captcha

    return !invalidCookie
  }
}
