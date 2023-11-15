import { describe, expect, it } from 'vitest'
import { makeTestCreateUserUseCase, makeTestGetUserUseCase } from './factories'
import { GetUserUseCase } from './get-user'
import {
  makeCreateUserUseCaseRequest,
  makeGetUserUseCaseRequest,
} from '@test/factories'

let sut: GetUserUseCase

describe('Get User Use Case', () => {
  beforeEach(() => {
    sut = makeTestGetUserUseCase()
  })

  it('should be able to get user', async () => {
    const createUserUseCase = makeTestCreateUserUseCase()
    const createUserRequest = makeCreateUserUseCaseRequest()
    const resultCreateUser = await createUserUseCase.execute(createUserRequest)
    expect(resultCreateUser.isRight()).toBe(true)

    const getUserRequest = makeGetUserUseCaseRequest({
      id: resultCreateUser.value.user._id.value,
    })
    const getResultUser = await sut.execute(getUserRequest)
    expect(getResultUser.isRight()).toBe(true)
  })

  it('should not be able to get user with invalid id', async () => {
    const getUserRequest = makeGetUserUseCaseRequest({ id: 'teste' })
    const getResultUser = await sut.execute(getUserRequest)
    expect(getResultUser.isLeft()).toBe(true)
  })

  it('should not be able to get user with not found id', async () => {
    const getUserRequest = makeGetUserUseCaseRequest()
    const getResultUser = await sut.execute(getUserRequest)
    expect(getResultUser.isRight()).toBe(true)
    expect(getResultUser.value.user).toBe(undefined)
  })
})
