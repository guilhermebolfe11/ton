import { GetUserUseCaseRequest } from '@/domain/use-cases'
import { randomUUID } from 'node:crypto'

export function makeGetUserUseCaseRequest(
  override: Partial<GetUserUseCaseRequest> = {},
) {
  const request = {
    id: override.id ?? randomUUID(),
  } as GetUserUseCaseRequest
  return request
}
