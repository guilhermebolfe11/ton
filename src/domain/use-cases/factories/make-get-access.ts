import { NinjaCounterService } from '@/infra/services'
import { GetAccessUseCase } from '../get-access'
import { InMemoryCounterService } from '@test/services'

export function makeGetAccessUseCase() {
  const counterService = new NinjaCounterService()
  const useCase = new GetAccessUseCase(counterService)
  return useCase
}

export function makeTestGetAccessUseCase() {
  const counterService = new InMemoryCounterService()
  const useCase = new GetAccessUseCase(counterService)
  return useCase
}
