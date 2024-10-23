import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { postSpaces } from "./PostSpaces";
// import { v4 } from "uuid";

// initialize dynamodb client to re-use
const ddbClient = new DynamoDBClient({}); // empty configuration

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  // lambda is triggered or received by API Gateway

  let message: string;

  try {
    switch (event.httpMethod) {
      case "GET":
        message = `Hello from GET `;
        break;
      case "POST":
        const response = await postSpaces(event, ddbClient);
        return response;

      default:
        break;
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify(`Error: ${error}`),
    };
  }

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(message),
  };

  return response;
}

export { handler };

// exports.main = async function (event, context) {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       `Hello from lambda and i will be reading from ${process.env.TABLE_NAME}`
//     ),
//   };
// };
