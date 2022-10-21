import fetch, { Headers } from 'node-fetch'
import { LogType } from '../db/constants'
import { storeLog } from '../db/utils'
import { Logger } from '../Logger'
import { Auth } from './Auth'
import { QUERY } from './SedeQueries/constants'

// type to define [score, amount]
export type ScoreAmountItem = [number, number]

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

        Logger.log('Try to fetch')

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
        QUERY.LIST_USERS_BY_SCORE,
        {
          method: 'POST',
          headers,
          body: params
        }
      )

      const response = await jobIdResponse.json()
      const jobId = await response.job_id

      if (jobId === undefined) {
        // job didn't started. Possible reason is that the SEDE cookie is no more valid

        storeLog(LogType.ERROR, response)
        Logger.log(response)
        throw new Error('Invalid SEDE cookie')
      }

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

  public getAmountUsersByScoreByTag = async (
    tag: string,
    signal: AbortSignal
  ): Promise<ScoreAmountItem[] | undefined> => {
    const headers = this.getHeaders()

    const params = new URLSearchParams()
    params.append('tagName', tag)

    try {
      Logger.log(`Start "Count users by score of a specific tag" job for tag: ${tag}`)

      const jobIdResponse = await fetch(
        QUERY.COUNT_USERS_SCORE_TAG,
        {
          method: 'POST',
          headers,
          body: params
        }
      )

      const res = await jobIdResponse.json()
      const isResponseACache = res.fromCache

      try {
        let scoreAmountItems: any

        if (isResponseACache) scoreAmountItems = res.resultSets[0].rows
        else {
          const jobId = await (res).job_id

          if (!jobId) {
            throw new Error(`Impossible to start job "Count users by score of a specific tag" for the tag ${tag}`);
          }

          Logger.log(`Start fetching score amount for tag: ${tag}`)
          const data = await this.getJobResponse(jobId, signal)

          scoreAmountItems = data?.resultSets[0]?.rows
        }

        if (scoreAmountItems) {
          Logger.log('Fetched')
          return scoreAmountItems
        }
        return []
      } catch (error) {
        storeLog(LogType.ERROR, error.message)
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
