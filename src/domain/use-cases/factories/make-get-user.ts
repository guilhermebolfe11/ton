import { DynamoUsersRepository } from '@infra/repositories/dynamo-users-repository'
import { GetUserUseCase } from '../get-user'
import { InMemoryUsersRepository } from '@test/repositories'

export function makeGetUserUseCase() {
  const repository = new DynamoUsersRepository()
  const useCase = new GetUserUseCase(repository)
  return useCase
}

export function makeTestGetUserUseCase() {
  const repository = new InMemoryUsersRepository()
  const useCase = new GetUserUseCase(repository)
  return useCase
}
