import {
  Handler,
  APIGatewayAuthorizerEvent,
  APIGatewaySimpleAuthorizerResult,
} from 'aws-lambda'
type ProxyHandler = Handler<
  APIGatewayAuthorizerEvent,
  APIGatewaySimpleAuthorizerResult
>

export const handler: ProxyHandler = async (
  event: APIGatewayAuthorizerEvent,
  context,
): Promise<APIGatewaySimpleAuthorizerResult> => {
  try {
    if (event.type === 'REQUEST') {
      return {
        isAuthorized: event.headers?.Authorization === 'authToken',
      }
    } else {
      return {
        isAuthorized: false,
      }
    }
  } catch (e) {
    return {
      isAuthorized: false,
    }
  }
}
