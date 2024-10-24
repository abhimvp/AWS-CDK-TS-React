import { Amplify } from "aws-amplify";
import { SignInOutput, fetchAuthSession, signIn } from "@aws-amplify/auth";
const awsRegion = "ap-south-1";
// configure amplify setup
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "ap-south-1_****",
      userPoolClientId: "*********",
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
}
