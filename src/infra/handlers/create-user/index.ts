import {
  Handler,
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda'
import { makeCreateUserUseCase } from '@domain/use-cases/factories/make-create-user'
import { UserDTO } from '@/infra/dtos'
type ProxyHandler = Handler<APIGatewayProxyEventV2, APIGatewayProxyResultV2>

export const handler: ProxyHandler = async (
  event: APIGatewayProxyEventV2,
  context,
): Promise<APIGatewayProxyResultV2> => {
  try {
    const useCase = makeCreateUserUseCase()
    const { body } = event
    const response = await useCase.execute(JSON.parse(body ?? '{}'))
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
      body: JSON.stringify(new UserDTO(response.value.user)),
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
