import { Either, right } from '../entities'
import { CounterService } from '../services'

type GetAccessUseCaseResponse = Either<Error, number>

export class GetAccessUseCase {
  constructor(private counterService: CounterService) {}
  async execute(): Promise<GetAccessUseCaseResponse> {
    return right(await this.counterService.get('ton'))
  }
}
