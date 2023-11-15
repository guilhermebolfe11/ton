import { DynamoUsersRepository } from '@infra/repositories/dynamo-users-repository'
import { CreateUserUseCase } from '../create-user'
import { InMemoryUsersRepository } from '@test/repositories'

export function makeCreateUserUseCase() {
  const repository = new DynamoUsersRepository()
  const useCase = new CreateUserUseCase(repository)
  return useCase
}

export function makeTestCreateUserUseCase() {
  const repository = new InMemoryUsersRepository()
  const useCase = new CreateUserUseCase(repository)
  return useCase
}
