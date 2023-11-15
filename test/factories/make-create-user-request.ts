import { CreateUserUseCaseRequest } from '@/domain/use-cases'
import { fakerPT_BR as faker } from '@faker-js/faker'

export function makeCreateUserUseCaseRequest(
  override: Partial<CreateUserUseCaseRequest> = {},
) {
  const password = faker.internet.password()
  const request = {
    name: override.name ?? faker.company.name(),
    email: override.email ?? faker.internet.email(),
    password: override.password ?? password,
    confirmPassword: override.confirmPassword ?? password,
  } as CreateUserUseCaseRequest
  return request
}
