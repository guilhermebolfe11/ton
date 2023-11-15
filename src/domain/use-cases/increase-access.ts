import { Either, right } from '../entities'
import { CounterService } from '../services'

type IncreaseAccessUseCaseResponse = Either<Error, number>

export class IncreaseAccessUseCase {
  constructor(private counterService: CounterService) {}
  async execute(): Promise<IncreaseAccessUseCaseResponse> {
    return right(await this.counterService.increase('ton'))
  }
}
