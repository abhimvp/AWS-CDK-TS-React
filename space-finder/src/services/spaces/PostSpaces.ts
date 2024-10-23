import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";

export async function postSpaces(
  event: APIGatewayProxyEvent,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  const randomID = v4();
  const item = JSON.parse(event.body);
  //   item.id = randomID;

  const result = await ddbClient.send(
    new PutItemCommand({
      TableName: process.env.TABLE_NAME,
      Item: {
        id: { S: randomID },
        location: { S: item.location },
      },
    })
  );
  console.log(result);
  return {
    statusCode: 201,
    body: JSON.stringify(`Space created with id: ${randomID}`),
  };
}
