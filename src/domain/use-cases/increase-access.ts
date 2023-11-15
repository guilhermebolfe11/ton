import { Either, right } from '../entities'

type IncreaseAccessUseCaseResponse = Either<Error, number>

export class IncreaseAccessUseCase {
  async execute(): Promise<IncreaseAccessUseCaseResponse> {
    return right(0)
  }
}
