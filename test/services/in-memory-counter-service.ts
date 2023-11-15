import { CounterService } from '@/domain/services'

export class InMemoryCounterService implements CounterService {
  private counters: { [key: string]: number } = {}
  constructor() {
    this.counters = {
      ton: 0,
    }
  }

  async increase(id: string): Promise<number> {
    this.counters[id]++
    return this.counters[id]
  }

  async get(id: string): Promise<number> {
    return this.counters[id]
  }
}
