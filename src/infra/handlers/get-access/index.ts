import { makeGetAccessUseCase } from '@/domain/use-cases/factories'
import {
  Handler,
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda'

type ProxyHandler = Handler<APIGatewayProxyEventV2, APIGatewayProxyResultV2>

export const handler: ProxyHandler = async (
  event,
  context,
): Promise<APIGatewayProxyResultV2> => {
  try {
    const useCase = makeGetAccessUseCase()
    const response = await useCase.execute()
    if (response.isLeft()) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Bad request',
          issues: [response.value.message],
        }),
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(response.value),
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal server error',
        issues: [e.message],
      }),
    }
  }
}
