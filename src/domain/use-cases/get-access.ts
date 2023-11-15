import { Either, right } from '../entities'

type GetAccessUseCaseResponse = Either<Error, number>

export class GetAccessUseCase {
  async execute(): Promise<GetAccessUseCaseResponse> {
    return right(0)
  }
}
