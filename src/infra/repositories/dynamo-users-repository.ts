import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb'
import { User } from '@domain/entities'
import { UsersRepository } from '@domain/repositories'
import { env } from '../env'

export class DynamoUsersRepository implements UsersRepository {
  private client: DynamoDBClient
  private tableName: string
  constructor() {
    this.client = new DynamoDBClient()
    this.tableName = env.USERS_TABLE
  }

  async create(user: User): Promise<void> {
    const commandPutItem = new PutItemCommand({
      TableName: this.tableName,
      Item: {
        id: { S: user.id.toValue() },
        name: { S: user.name },
        email: { S: user.email },
        passwordHash: { S: user.passwordHash },
        createdAt: { S: user.createdAt.toISOString() },
        updatedAt: { S: user.updatedAt.toISOString() },
      },
    })

    await this.client.send(commandPutItem)
  }

  async get(id: string): Promise<User | undefined> {
    throw new Error('Method not implemented.')
  }
}
