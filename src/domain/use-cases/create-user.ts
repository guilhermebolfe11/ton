import { ZodError, z } from 'zod'
import { Either, User, left, right } from '../entities'
import { UsersRepository } from '../repositories'
import { hash } from 'bcryptjs'

export interface CreateUserUseCaseRequest {
  name: string
  email: string
  password: string
  confirmPassword: string
}

type CreateUserUseCaseResponse = Either<
  ZodError,
  {
    user: User
  }
>

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(
    request: CreateUserUseCaseRequest,
  ): Promise<CreateUserUseCaseResponse> {
    const createUserSchema = z
      .object({
        email: z.string().email(),
        name: z.string(),
        password: z.string(),
        confirmPassword: z.string(),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
      })

    const responseParse = createUserSchema.safeParse(request)
    if (!responseParse.success) {
      return left(responseParse.error)
    }

    const passwordHash = await hash(request.password, 6)

    const user = User.create({
      email: request.email,
      name: request.name,
      passwordHash,
    })

    await this.usersRepository.create(user)

    return right({
      user,
    })
  }
}
