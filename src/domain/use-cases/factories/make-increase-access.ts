import { IncreaseAccessUseCase } from '../increase-access'

export function makeIncreaseAccessUseCase() {
  const useCase = new IncreaseAccessUseCase()
  return useCase
}

export function makeTestIncreaseAccessUseCase() {
  const useCase = new IncreaseAccessUseCase()
  return useCase
}
