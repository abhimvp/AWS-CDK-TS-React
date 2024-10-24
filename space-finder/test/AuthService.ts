import { Amplify } from "aws-amplify";
import { SignInOutput, fetchAuthSession, signIn } from "@aws-amplify/auth";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
const awsRegion = "ap-south-1";
// configure amplify setup
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "ap-south-1_Sjq****",
      userPoolClientId: "6ericd7oqng3tr80u8****",
      identityPoolId: "ap-south-1:46417e25-c497-46fc-893b-e9b0ad****",
    },
  },
});
export class AuthService {
  public async login(userName: string, password: string) {
    const signInOutput: SignInOutput = await signIn({
      username: userName,
      password: password,
      options: {
        authFlowType: "USER_PASSWORD_AUTH",
      },
    });
    return signInOutput;
  }
  /**
   * call only after login
   */
  public async getIdToken() {
    // this ID token will allow us to access private APIs or APIs protected by Cognito.
    const authSession = await fetchAuthSession();
    return authSession.tokens?.idToken?.toString();
    // The ID token can be used as a authorization.Or we can add this token to our API calls.
    // And this way our API calls will be authorized by Cognito.
  }
  public async generateTemporaryCredentials() {
    const idToken = await this.getIdToken();
    const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/ap-south-1_****`;
    const cognitoIdentity = new CognitoIdentityClient({
      credentials: fromCognitoIdentityPool({
        identityPoolId: "ap-south-1:46417e25-c497-46fc-893b-e9b0ada****",
        logins: {
          [cognitoIdentityPool]: idToken,
        },
      }),
    });
    const credentials = await cognitoIdentity.config.credentials();
    return credentials;
  }
}
