import { describe, expect, it } from 'vitest'
import { makeTestGetAccessUseCase } from './factories'
import { GetAccessUseCase } from './get-access'

let sut: GetAccessUseCase

describe('Get Access Use Case', () => {
  beforeEach(() => {
    sut = makeTestGetAccessUseCase()
  })

  it('should be able to get access', async () => {
    const getResultAccess = await sut.execute()
    expect(getResultAccess.isRight()).toBe(true)
    expect(getResultAccess.value).toBe(0)
  })
})
