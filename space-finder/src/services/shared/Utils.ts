import { APIGatewayProxyEvent } from "aws-lambda";
import { JsonError } from "./Validator";
import { randomUUID } from "crypto";
// one good solution would be to just make these occurances of this library(external) & put it somewhere in code
// if any library maintaners say change this feature or deprecated we can change/update here directly instead of going to occurance of the library code and change them - avoid tedious task
export function createRandomId() {
  return randomUUID();
}
export function parseJSON(arg: string) {
  try {
    return JSON.parse(arg);
  } catch (error) {
    throw new JsonError(error.message);
  }
}
export function hasAdminGroup(event: APIGatewayProxyEvent) {
  const groups = event.requestContext.authorizer?.claims["cognito:groups"];
  if (groups) {
    return (groups as string).includes("admins");
  }
  return false;
}
