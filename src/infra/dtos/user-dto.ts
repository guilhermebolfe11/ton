import { User } from '@/domain/entities'

export class UserDTO {
  id: string
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
  constructor(user: User) {
    this.id = user.id.toValue()
    this.name = user.name
    this.email = user.email
    this.createdAt = user.createdAt
    this.updatedAt = user.updatedAt
  }
}
