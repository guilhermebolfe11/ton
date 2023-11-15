import { User } from '../../src/domain/entities'
import { UsersRepository } from './../../src/domain/repositories/users-repository'
export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []
  async create(user: User): Promise<void> {
    this.items.push(user)
  }

  async get(id: string): Promise<User | undefined> {
    const user = this.items.find((item) => item.id.toString() === id)

    if (!user) {
      return undefined
    }

    return user
  }
}
