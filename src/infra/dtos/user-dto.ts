import { User } from '@/domain/entities'

export class UserDTO {
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
  constructor(user: User) {
    this.name = user.name
    this.email = user.email
    this.createdAt = user.createdAt
    this.updatedAt = user.updatedAt
  }
}
