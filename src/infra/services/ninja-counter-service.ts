import { CounterService } from '@/domain/services'
import axios, { AxiosInstance } from 'axios'
import { env } from '../env'

interface NinjaCounter {
  id: string
  value: number
}

export class NinjaCounterService implements CounterService {
  private api: AxiosInstance
  constructor() {
    this.api = axios.create({
      baseURL: env.COUNTER_API_URL,
      headers: {
        'X-Api-Key ': env.COUNTER_API_KEY,
      },
    })
  }

  async increase(id: string): Promise<number> {
    try {
      const response = await this.api.get<NinjaCounter>(
        `/v1/counter?id=${id}&hit=true`,
      )
      return response.data.value
    } catch (e) {
      console.error(`Error Ninja Service: ${e.message}`)
      return 0
    }
  }

  async get(id: string): Promise<number> {
    try {
      const response = await this.api.get<NinjaCounter>(`/v1/counter?id=${id}`)
      return response.data.value
    } catch (e) {
      console.error(`Error Ninja Service: ${e.message}`)
      return 0
    }
  }
}
