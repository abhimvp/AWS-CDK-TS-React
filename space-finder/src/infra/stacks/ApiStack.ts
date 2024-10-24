import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import {
  AuthorizationType,
  CognitoUserPoolsAuthorizer,
  MethodOptions,
} from "aws-cdk-lib/aws-apigateway";
import { IUserPool } from "aws-cdk-lib/aws-cognito";
import { AuthorizationToken } from "aws-cdk-lib/aws-ecr";
import { Construct } from "constructs";

interface ApiStackProps extends StackProps {
  spacesLambdaIntegration: LambdaIntegration;
  userPool: IUserPool;
}

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    const api = new RestApi(this, "SpacesApi");
    const authorizer = new CognitoUserPoolsAuthorizer(
      this,
      "SpacesApiAuthorizer",
      {
        cognitoUserPools: [props.userPool],
        identitySource: "method.request.header.Authorization", // this identity source is the location of the authorization header.
      }
    );
    authorizer._attachToApi(api); // If we don't do this, we will get an error when we will call CDK synth
    const optionsWithAuth: MethodOptions = {
      authorizationType: AuthorizationType.COGNITO,
      authorizer: {
        authorizerId: authorizer.authorizerId,
      },
    };
    const spaceResource = api.root.addResource("spaces");
    spaceResource.addMethod('GET', props.spacesLambdaIntegration, optionsWithAuth);
    spaceResource.addMethod('POST', props.spacesLambdaIntegration,optionsWithAuth);
    spaceResource.addMethod('PUT', props.spacesLambdaIntegration, optionsWithAuth);
    spaceResource.addMethod('DELETE', props.spacesLambdaIntegration, optionsWithAuth);
  }
}
