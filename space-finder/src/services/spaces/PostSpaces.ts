import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { createRandomId, parseJSON } from "../shared/Utils";
import { validateAsSpaceEntry } from "../shared/Validator";

export async function postSpaces(
  event: APIGatewayProxyEvent,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  const randomId = createRandomId();
  const item = parseJSON(event.body);
  item.id = randomId
  validateAsSpaceEntry(item)

  const result = await ddbClient.send(
    new PutItemCommand({
      TableName: process.env.TABLE_NAME,
      Item: marshall(item), // takes all attributes of this item and add those attribute types
    })
  );
  // console.log(result);
  return {
    statusCode: 201,
    body: JSON.stringify(`Space created with id: ${randomId}`),
  };
}
