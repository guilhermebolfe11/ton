import { describe, expect, it } from 'vitest'
import { makeTestIncreaseAccessUseCase } from './factories'
import { IncreaseAccessUseCase } from './increase-access'

let sut: IncreaseAccessUseCase

describe('Increase Access Use Case', () => {
  beforeEach(() => {
    sut = makeTestIncreaseAccessUseCase()
  })

  it('should be able to increase access', async () => {
    const getResultAccess = await sut.execute()
    expect(getResultAccess.isRight()).toBe(true)
    expect(getResultAccess.value).toBe(1)
  })
})
