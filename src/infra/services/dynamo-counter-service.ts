import { CounterService } from '@/domain/services'
import { env } from '../env'
import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  UpdateItemCommand,
} from '@aws-sdk/client-dynamodb'

export class DynamoCounterService implements CounterService {
  private client: DynamoDBClient
  private tableName: string
  constructor() {
    this.client = new DynamoDBClient()
    this.tableName = env.COUNTER_TABLE
  }

  async increase(id: string): Promise<number> {
    let current = await this.get(id)

    if (current === -1) {
      const putItemCommand = new PutItemCommand({
        TableName: this.tableName,
        Item: {
          id: { S: id },
          value: { N: '1' },
        },
      })

      await this.client.send(putItemCommand)
      current = 1
    } else {
      const updateItemCommand = new UpdateItemCommand({
        TableName: this.tableName,
        Key: {
          id: { S: id },
        },
        ExpressionAttributeNames: {
          '#value': 'value',
        },
        ExpressionAttributeValues: {
          ':change': {
            N: '1',
          },
        },
        UpdateExpression: 'ADD #value :change',
        ReturnValues: 'UPDATED_NEW',
      })
      const responseUpdateItem = await this.client.send(updateItemCommand)
      current = parseInt(responseUpdateItem.Attributes?.value.N ?? '0')
    }

    return current
  }

  async get(id: string): Promise<number> {
    const getItemCommand = new GetItemCommand({
      TableName: this.tableName,
      Key: {
        id: { S: id },
      },
    })

    const responseGet = await this.client.send(getItemCommand)

    if (!responseGet.Item) {
      return -1
    }

    return parseInt(responseGet.Item.value.N ?? '0')
  }
}
