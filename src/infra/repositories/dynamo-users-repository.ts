import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} from '@aws-sdk/client-dynamodb'
import { UniqueEntityID, User } from '@domain/entities'
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
    const putItemCommand = new PutItemCommand({
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

    await this.client.send(putItemCommand)
  }

  async get(id: string): Promise<User | undefined> {
    const getItemCommand = new GetItemCommand({
      TableName: this.tableName,
      Key: {
        id: { S: id },
      },
    })

    const responseGet = await this.client.send(getItemCommand)

    if (!responseGet.Item) {
      return undefined
    }

    return User.create(
      {
        email: responseGet.Item.email.S ?? '',
        name: responseGet.Item.name.S ?? '',
        passwordHash: responseGet.Item.passwordHash.S ?? '',
        createdAt: new Date(responseGet.Item.createdAt.S ?? ''),
        updatedAt: new Date(responseGet.Item.updatedAt.S ?? ''),
      },
      new UniqueEntityID(responseGet.Item.id.S),
    )
  }
}
