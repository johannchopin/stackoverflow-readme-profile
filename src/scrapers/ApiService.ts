import fetch, { Headers } from 'node-fetch'
import { Logger } from '../Logger'
import { Auth } from './Auth'

export class ApiService {
  constructor(private authInstance: Auth) {
    return this
  }

  public getHeaders = (): Headers => {
    return new Headers({ Cookie: this.authInstance.cookie as string })
  }

  private getJobResponse = async (jobId: string, signal: AbortSignal): Promise<any | undefined> => {
    return new Promise<any>((resolve) => {
      const fetchTopUserInterval = setInterval(async () => {
        if (signal.aborted) {
          clearInterval(fetchTopUserInterval)
          resolve(undefined)
        }

        Logger.log('try to fetch')

        const topUsersResponse = await fetch(
          `https://data.stackexchange.com/query/job/${jobId}`,
          { headers: this.getHeaders() }
        )
        const responseBody = await topUsersResponse.json()

        if (!responseBody.running) {
          clearInterval(fetchTopUserInterval)
          resolve(responseBody)
        }
      }, 4000)
    })
  }

  // return type is [userId, userScore]
  public getTopUsersByTag = async (tag: string, signal: AbortSignal): Promise<[number, number][] | undefined> => {
    const headers = this.getHeaders()

    const params = new URLSearchParams()
    params.append('tagName', tag)

    try {
      Logger.log(`Start job for tag: ${tag}`)

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
        Logger.log(`Start fetching top users for tag: ${tag}`)
        const data = await this.getJobResponse(jobId, signal)

        if (data) {
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
        }
        return []
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
