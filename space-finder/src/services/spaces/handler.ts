import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { postSpaces } from "./PostSpaces";
import { getSpaces } from "./GetSpaces";
import { updateSpace } from "./UpdateSpace";
import { deleteSpace } from "./DeleteSpace";
import { JsonError, MissingFieldError } from "../shared/Validator";

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
        const getResponse = await getSpaces(event, ddbClient);
        console.log(getResponse);
        return getResponse;
      case "POST":
        const postResponse = await postSpaces(event, ddbClient);
        console.log(postResponse);
        return postResponse;
      case "PUT":
        const putResponse = await updateSpace(event, ddbClient);
        console.log(putResponse);
        return putResponse;
      case "DELETE":
        const deleteResponse = await deleteSpace(event, ddbClient);
        console.log(deleteResponse);
        return deleteResponse;

      default:
        break;
    }
  } catch (error) {
    if (error instanceof MissingFieldError) {
      // if there's something with our request
      return {
        statusCode: 400,
        body: error.message,
      };
    }
    if (error instanceof JsonError) {
      return {
        statusCode: 400,
        body: error.message,
      };
    }
    return {
      // type of error we don't expect
      statusCode: 500,
      body: error.message,
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
