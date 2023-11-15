import { User } from '../entities'

export interface UsersRepository {
  create(user: User): Promise<void>
  get(id: string): Promise<User | undefined>
}
