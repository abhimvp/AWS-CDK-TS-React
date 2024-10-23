import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { v4 } from "uuid";

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  // lambda is triggered or received by API Gateway

  let message: string

  switch (event.httpMethod) {
    case "GET":
        message = `Hello from GET `
      break;
    case "POST":
        message = `Hello from POST `
      break;

    default:
      break;
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
