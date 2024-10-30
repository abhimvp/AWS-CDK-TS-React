# All About API Gateway

- Amazon API Gateway is one of the core AWS services that forms the foundation of AWS Serverless platform
- The API Gateway is a fully managed serverless service from AWS and it allows us to create, publish, and run secure APIs at any scale.
- With API Gateway we can create API endpoints to integrate frontend applications with its backend, using RESTful APIs over HTTPS.
- API Gateway being a serverless offering, does not require us to provision any servers.It allows us to build APIs that are extremely low cost, highly scalable, secure, and easy to monitor as well.
- It’s a fully managed service and can handle thousands of concurrent API calls.
- we can use the API Gateway to create RESTful APIs endpoints that communicate over HTTPS and at the backend, we can connect the API to different AWS Services.
- Amazon API Gateway integrates well with Lambda letting you create completely serverless APIs.
- These APIs can then be consumed by our mobile and web applications allowing us to interact with different AWS services through our code running in Lambda.And we can easily add authentication or authorization to our APIs as well.
- `An API in API Gateway contains one or more resources and each of the resources can have one or more HTTP methods like GET, POST, PATCH, DELETE and so on.`.Once we are done creating our API, we simply deploy the API to a stage.A stage is like an environment, for example a test stage or production stage.It also gives you full control to create APIs with fine-grained access control and version management capabilities.
- When we choose proxy integration, API Gateway acts as a mere proxy between the calling application & lambda.So the request from the caller is passed on as is, to Lambda without any modification.Similarly, response received from Lambda is passed back to the caller, as it is, without any modification
- That is the reason we are returning a well-formed HTTP response object from our Lambda function.
- When using proxy integration, we cannot add any request or response mapping within API GW.
- We must give invoke permissions for API Gateway to be able to invoke the Lambda function.
- we cannot use any mappings or request/response transformations within API Gateway when we're using the proxy integration.And that’s the reason why, we are sending status code and the body in our Lambda response.
  - If we don’t do that, then the HTTP client is not going to understand or won’t be able to interpret our response.
- Before we can test this API from a browser or over the internet, we have to deploy it.

### CORS Configuration for Lambda Proxy Integration

- However, if we try to call this API endpoint from an application hosted on some other domain , it may not work.
- We may want to call this API through our application deployed on a certain website, for example.And, this API with the current setup however, may not work as expected, in this situation.
- make use of [test-cors site](http://client.cors-api.appspot.com/client)
- And if we look at the console, we can see that it says “No Access Control Origin" header is present on the requested resource.Origin https:// test dash cors dot org is therefore not allowed to access.
- CORS stands for Cross Origin Resource Sharing.
- And most modern browsers will block the requests that attempt to request resources from other websites if the other website does not explicitly allow requests from those websites.So the browser will attempt to block such requests.
- We can actually add a response header in the Method Response, So in case of Lambda proxy integrations, we must pass all the necessary response headers directly from the Lambda function.
- When we make an HTTP request like GET or POST for example, most modern browsers like Chrome send an OPTIONS request before sending our actual HTTP request.`This OPTIONS request is called as a preflight request.`
- And only if this preflight request is successful, the browser will attempt to send our original or actual GET or POST request.
- `So we also have to create an OPTIONS method to address CORS properly.`
- let’s look at how to send these headers from our Lambda function.headers, and then pass in an object containing key-value pairs of the necessary

### Adding Request Validators for Query String and Headers

- API_GW only sends valid API requests through to Lambda?
- Method request block is executed before the request goes over to Lambda.
  - `So this is the place to validate the incoming requests.`
  - We can either validate only the request body, or body along with query string parameters and headers, or just validate the query string parameters and headers.
  - We’re using a GET request, so it does not have a body, so we’ll choose the third option to validate query string parameters and headers.
  - Once that is set, we have two options here, URL Query String Parameters and HTTP Request headers , So we can add headers here.And `if those headers are present on the incoming request, only then that request will be processed further`.And here you can add query string parameters.So in our case, let’s say we want a particular query string parameter, say lang to be present on the request.And then you can choose the checkbox under Required.This will make the API Gateway to validate the incoming request before it sends it to our Lambda function.And if the request does not have the query string parameter named lang, it won’t be processed further

#### POST Request Example - Creating Lambda Function
