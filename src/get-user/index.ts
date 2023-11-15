import {
  Handler,
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from "aws-lambda";
import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { ZodError, z } from "zod";

type ProxyHandler = Handler<APIGatewayProxyEventV2, any>;

export const handler: ProxyHandler = async (
  event: APIGatewayProxyEventV2,
  context
): Promise<APIGatewayProxyResultV2> => {
  try {
    const dbClient = new DynamoDBClient();
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { pathParameters } = event;
    const { id } = paramsSchema.parse(pathParameters);

    const commandGetItem = new GetItemCommand({
      TableName: "ton-users",
      Key: {
        id: { S: id },
      },
    });

    const responseGetItem = await dbClient.send(commandGetItem);

    if (!responseGetItem.Item) {
      throw new Error("Item not found");
    }

    const user = {
      id: responseGetItem.Item["id"].S,
      name: responseGetItem.Item["name"].S,
      email: responseGetItem.Item["email"].S,
    };

    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  } catch (e) {
    if (e instanceof ZodError) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Validation Error",
          issues: e.format(),
        }),
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error",
        issues: [e.message],
      }),
    };
  }
};
