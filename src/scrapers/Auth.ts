import fetch, { Headers } from 'node-fetch'
import { EntityManager } from 'typeorm'
import { Cookie } from '../db/entity/Cookie'
import { Logger } from '../Logger'

export class Auth {
  public cookie: string | undefined

  constructor(public manager: EntityManager) {
    return this
  }

  public init = async (): Promise<Auth> => {
    this.cookie = await this.getStoredCookie()
    return this
  }

  private getStoredCookie = async (): Promise<string | undefined> => {
    const cookie = await this.manager.findOne(Cookie)
    if (cookie) return cookie.value

    return undefined
  }

  public isValid = async (): Promise<boolean> => {
    if (this.cookie) {
      const headers = new Headers({ Cookie: this.cookie })
      const params = new URLSearchParams()
      params.append('tagName', 'foobar')

      const jobIdResponse = await fetch(
        'https://data.stackexchange.com/query/run/1/1629390/1986822',
        {
          method: 'POST',
          headers,
          body: params
        }
      )

      const invalidCookie = await (await jobIdResponse.json()).captcha

      if (invalidCookie) {
        this.manager.getRepository(Cookie).clear()
        Logger.log('Provided cookie expired')
      }

      return !invalidCookie
    }

    Logger.log('No cookie provided')
    return false
  }
}
