import {
  Handler,
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from "aws-lambda";
import axios from "axios";

type ProxyHandler = Handler<APIGatewayProxyEventV2, any>;

export const handler: ProxyHandler = async (
  event,
  context
): Promise<APIGatewayProxyResultV2> => {
  try {
    const countApi = axios.create({
      baseURL: "https://api.countapi.xyz",
    });

    return {
      statusCode: 200,
      body: "Current Access",
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error",
        issues: [e.message],
      }),
    };
  }
};
