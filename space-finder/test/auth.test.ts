import { AuthService } from "./AuthService";
async function testAuth() {
  const service = new AuthService();
  const loginResult = await service.login("abhimvp", "Abhi@4698");
//   console.log(loginResult.getSignInUserSession().getIdToken().getJwtToken());
  const idToken = await service.getIdToken();
  console.log(idToken);
}
testAuth();
