import { GetAccessUseCase } from '../get-access'

export function makeGetAccessUseCase() {
  const useCase = new GetAccessUseCase()
  return useCase
}

export function makeTestGetAccessUseCase() {
  const useCase = new GetAccessUseCase()
  return useCase
}
