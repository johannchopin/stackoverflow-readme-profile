import fetch, { Headers } from 'node-fetch'
import { Logger } from '../Logger'
import { Auth } from './Auth'

export class Api {
  constructor(private authInstance: Auth) {
    return this
  }

  public getHeaders = (): Headers => {
    return new Headers({ Cookie: this.authInstance.cookie as string })
  }

  // return type is [userId, userScore]
  public getTopUsersByTag = async (tag: string): Promise<[number, number][] | undefined> => {
    const headers = this.getHeaders()

    const params = new URLSearchParams()
    params.append('tagName', tag)

    try {
      Logger.log(`start job for tag: ${tag}`)

      const jobIdResponse = await fetch(
        'https://data.stackexchange.com/query/run/1/1629390/1986822',
        {
          method: 'POST',
          headers,
          body: params
        }
      )

      const jobId = await (await jobIdResponse.json()).job_id

      try {
        const topUsersResponse = await fetch(
          `https://data.stackexchange.com/query/job/${jobId}`,
          { headers }
        )

        console.log(typeof topUsersResponse)

        // problem we got zip as response

        const data = await topUsersResponse.json()
        const topUsers: [number, number][] = []

        // @ts-ignore
        data.resultSets[0].rows.forEach((row) => {
          const topUserId = row[0].id
          const topUserScore = row[1]
          const topUser: [number, number] = [topUserId, topUserScore]
          topUsers.push(topUser)
        })

        Logger.log(`Fetched top users for tag: ${tag}`)

        return topUsers
      } catch (error) {
        Logger.log('Error trying to get response of a query job')
        Logger.log(error)
        return undefined
      }
    } catch (error) {
      Logger.log('Error trying to start a query job')
      Logger.log(error)

      return undefined
    }
  }
}
