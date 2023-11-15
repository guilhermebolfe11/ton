import { Optional } from '../types'
import { Entity } from './entity'
import { UniqueEntityID } from './unique-entity-id'

export interface UserProps {
  name: string
  email: string
  passwordHash: string
  createdAt: Date
  updatedAt: Date
}

export class User extends Entity<UserProps> {
  set name(value: string) {
    this.props.name = value
    this.touch()
  }

  get name() {
    return this.props.name
  }

  set email(value: string) {
    this.props.email = value
    this.touch()
  }

  get email() {
    return this.props.email
  }

  set passwordHash(value: string) {
    this.props.passwordHash = value
    this.touch()
  }

  get passwordHash() {
    return this.props.passwordHash
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<UserProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID,
  ) {
    const user = new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    )
    return user
  }
}
