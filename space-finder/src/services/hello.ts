import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { v4 } from "uuid";
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";

// good practice is to iniitialize the client outside the lambda this will allow the lambda to resuse this client
const s3Client = new S3Client({});

async function handler(event: APIGatewayProxyEvent, context: Context) {
  // lambda is triggered or received by API Gateway

  const command = new ListBucketsCommand({});
  const ListBucketsResult = (await s3Client.send(command)).Buckets;
  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(`Hello from lambda , Here are your buckets:  ` + JSON.stringify(ListBucketsResult)),
  };
  console.log(event);
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
