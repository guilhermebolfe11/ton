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
    const createUserRequest = makeCreateUserUseCaseRequest()
    const getResultUser = await sut.execute(createUserRequest)
    expect(getResultUser.isRight()).toBe(true)
  })

  it('should not be able to create user with different passwords', async () => {
    const createUserRequest = makeCreateUserUseCaseRequest({ password: '123' })
    const getResultUser = await sut.execute(createUserRequest)
    expect(getResultUser.isLeft()).toBe(true)
  })

  it('should not be able to create user with invalid email', async () => {
    const createUserRequest = makeCreateUserUseCaseRequest({
      email: 'invalid.com',
    })
    const getResultUser = await sut.execute(createUserRequest)
    expect(getResultUser.isLeft()).toBe(true)
  })
})
