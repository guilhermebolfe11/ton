import { hash } from "bcryptjs";
import { randomUUID } from "node:crypto";
import {
  Handler,
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from "aws-lambda";
import { ZodError, z } from "zod";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

type ProxyHandler = Handler<APIGatewayProxyEventV2, any>;

export const handler: ProxyHandler = async (
  event: APIGatewayProxyEventV2,
  context
): Promise<APIGatewayProxyResultV2> => {
  try {
    const dbClient = new DynamoDBClient();
    const bodySchema = z.object({
      email: z.string().email(),
      name: z.string(),
      password: z.string(),
      confirmPassword: z.string(),
    });

    const { body } = event;
    const userCreateInput = bodySchema.parse(JSON.parse(body ?? ""));
    const user = {
      id: randomUUID(),
      name: userCreateInput.name,
      email: userCreateInput.email,
      passwordHash: await hash(userCreateInput.password, 6),
    };

    const commandPutItem = new PutItemCommand({
      TableName: "ton-users",
      Item: {
        id: { S: user.id },
        name: { S: user.name },
        email: { S: user.email },
        passwordHash: { S: user.passwordHash },
      },
    });

    const responsePutItem = await dbClient.send(commandPutItem);

    if (responsePutItem.$metadata.httpStatusCode !== 200) {
      throw new Error("Error on insert");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ...user, passwordHash: null }),
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
