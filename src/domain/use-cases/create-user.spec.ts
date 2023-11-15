import { describe, expect, it } from 'vitest'
import { makeTestCreateUserUseCase } from './factories'
import { CreateUserUseCase } from './create-user'
import { makeCreateUserUseCaseRequest } from '@test/factories'
let sut: CreateUserUseCase

describe('Create User Use Case', () => {
  beforeEach(() => {
    sut = makeTestCreateUserUseCase()
  })

  it('should be able to create user', async () => {
    const userRequest = makeCreateUserUseCaseRequest()
    const resultUser = await sut.execute(userRequest)
    expect(resultUser.isRight()).toBe(true)
  })
})
