import {
  Handler,
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda'
import { makeGetUserUseCase } from '@domain/use-cases/factories'
type ProxyHandler = Handler<APIGatewayProxyEventV2, any>

export const handler: ProxyHandler = async (
  event: APIGatewayProxyEventV2,
  context,
): Promise<APIGatewayProxyResultV2> => {
  try {
    const useCase = makeGetUserUseCase()
    const { pathParameters } = event
    const response = await useCase.execute(pathParameters)
    if (response.isLeft()) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Bad request',
          issues: response.value.format(),
        }),
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(response.value.user),
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
