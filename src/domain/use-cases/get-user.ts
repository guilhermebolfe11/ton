import { ZodError, z } from 'zod'
import { Either, User, left, right } from '../entities'
import { UsersRepository } from '../repositories'

export interface GetUserUseCaseRequest {
  id: string
}

type GetUserUseCaseResponse = Either<
  ZodError,
  {
    user: User | undefined
  }
>

export class GetUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(
    request: GetUserUseCaseRequest,
  ): Promise<GetUserUseCaseResponse> {
    const getUserSchema = z.object({
      id: z.string().uuid(),
    })

    const responseParse = getUserSchema.safeParse(request)
    if (!responseParse.success) {
      return left(responseParse.error)
    }

    const user = await this.usersRepository.get(request.id)

    return right({
      user,
    })
  }
}
