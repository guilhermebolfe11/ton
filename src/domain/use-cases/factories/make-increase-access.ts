import { DynamoCounterService } from '@/infra/services'
import { IncreaseAccessUseCase } from '../increase-access'
import { InMemoryCounterService } from '@test/services'

export function makeIncreaseAccessUseCase() {
  const counterService = new DynamoCounterService()
  const useCase = new IncreaseAccessUseCase(counterService)
  return useCase
}

export function makeTestIncreaseAccessUseCase() {
  const counterService = new InMemoryCounterService()
  const useCase = new IncreaseAccessUseCase(counterService)
  return useCase
}
