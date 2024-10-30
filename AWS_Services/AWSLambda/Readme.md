# All about AWS Lambda

- AWS Lambda is an event driven serverless computing platform or a compute service provided by AWS
- The code that we run on AWS Lambda is called as a lambda function
- It runs whenever it's triggered by a preconfigured event source like s3 file uploads ,API Gateway calls , changes to dynamoDB table data , cloudwatch events , SNS notifications , third party API's , Iot Devices so on.
- no billing for the idle time , we are charged only for the time our lambda functions run and billing is done in increments of 100 milliseconds of compute time.
  - so if a lambda function runs for 90 milliseconds , we'd be billed for just about 100 milliseconds , while if it runs for say 200 milliseconds, we’ll be billed for that 200 milliseconds.
  - And about 1 million requests per month are free.
  - AWS Lambda is very low cost and does not require any upfront investment.
- There are various runtimes that are available – C# or DOT NET Core, Google Go, Java, Node , Python
- Handler is Index DOT handler, which means the function with name Handler located inside index DOT JS file. when a typescript file is compiled it outputs .js file which will be uploaded to lambda
- environment variables: you can add key-value pairs that the function code needs at the runtime.you can add environment specific constants or API keys here & then you can access them inside your code.
  - If the values of these environment variables are sensitive, then you can also explicitly encrypt them using this KMS service.
  - And if you do so, you’ll also need to decrypt them within your function code.
- we have Tags, Tags can be used to group and filter your functions.These are case-sensitive key value pairs
- Execution role is the Lambda execution role - To view the resources and actions that your function has permission to access
- You can also adjust the max memory that your function requires - its worth mentioning here that the CPU resources allocated to the function are always in proportion to the memory size that we choose here.
  - You can choose memory from 128 MB all the way up to 3 THOUSAND and EIGHT MB
  - And then you can set timeout in seconds.You can set this value anywhere from 1 second to up to 15 minutes.
  - So maximum amount of time any Lambda function can run is about 15 minutes.
  - Timeout is one of the essential considerations when building serverless apps.
- Ideally, your Lambda functions should be designed to perform single-specific task and not perform several tasks
- You can segregate your application logic in multiple Lambda functions, each performing one single specific task.
- This approach is often used in microservices architectures and such microservices based architectures are best suited for serverless applications.
- we have VPC settings under the Network section.Here you can attach your Lambda function to a VPC.You can simply choose your VPC and add desire subnets, at least two of them & VPC Security Group
  - When you attach a Lambda function to a VPC, the function will run within that VPC & will have access only to the resources inside the VPC.Thats means, it will lose access to the resources outside the VPC.It will also lose access to the internet.
  - And in case it requires internet access, you need to open appropriate outbound connections in the selected security group and the VPC will also require a NAT gateway in that case.
- you can define DLQs or Dead Letter Queues.These are useful when Lambda function ends up in errors even after multiple retries.So if a Lambda function errors out, Lambda can send this event payload either to an SQS queue or as SNS notification.
- we have concurrency limits.Here we define the maximum number of concurrent executions possible for your Lambda function.All AWS accounts receive a concurrency limit of 1000 and this is applied across the Lambda functions in your AWS account.
  - If you reserve concurrency limit for a particular function, then remaining concurrency limit will be shared by other Lambda functions present in your account.
- Auditing and Compliance can be set up using AWS CloudTrail service , allows you to log the function’s invocations inside CloudTrail if your organization requires that for auditing and compliance purposes.
- The Throttle option can be used to throttle your lambda function and you can use this in emergency purpose

### Permission Model

- AWS Lambda uses a decoupled permissions model.
  - The service or event that triggers the Lambda function only requires the necessary permissions to invoke the Lambda function.
- When you add an event trigger to your Lambda function, it is automatically assigned an appropriate IAM policy to invoke this Lambda function.
  - This role is called as Lambda invocation policy or Function policy.
- We can see list of services our Lambda function has access to.Clicking on the box will show you the specific resources and actions that this function’s code has access to.
  - These permissions are called as Lambda execution role.
- in effect there are two sets of IAM permissions applied here.
  - The invocation permissions via the function policy and the execution permissions via the execution role.
  - The function policy is used by the triggering event or the service to invoke the Lambda , function while the execution role is used by the Lambda function to access different AWS services that it depends on.
  - The function policy and execution role are independent of each other.
- Different event sources that trigger the Lambda function are not required to have the permissions that Lambda function code requires to complete its job.
- Thus the two are effectively decoupled thereby improving our application's security.

### Code :

- IF our lambda handler is declared as an Async function , we can make use of the await operator , syntax is only supported in Node.JS runtime 8.10.
- Irrespective of the type of handler you use, whether callback style or async/await style , there are two important arguments to the function handler function – event and context
  - The event object is dependent on the event source.So the structure of this event object varies from event to event and it acts as a source of input data for our lambda handler.
  - And context is what sets the general environment for our Lambda function.you can use the context object to retrieve information about the context in which the function executes – like the function name, remaining time, memory limit and other additional Info.
- `The event object holds the input data or input parameters that we want the Lambda function to act on.The structure of this event object depends on the event source.`
  - Lambda supports two invocation types - synchronous and asynchronous.
  - The invocation type – whether synchronous or asynchronous, depends on the event source.
    - For example, an S3 event is always asynchronous, while an API Gateway or Cognito event will be synchronous and we cannot control this.
    - However, in cases where we invoke the Lambda function through our own application using the invoke method of the AWS SDK, for example, we can choose the invocation type – either synchronous or asynchronous.
  - Then, we have two types of event sources – push based events and pull based or poll-based.
    - Push based events push the event data to Lambda in order to invoke the function.
    - in case of pull events or poll-based events, Lambda polls the event stream to look for event data.
    - Example of push event is an S3 event or an API Gateway event.
    - Example of pull or poll-based events is DynamoDB stream event, a Kinesis stream event or and Amazon SQS queue event.
    - In this type of event, Lambda pulls event data from the DynamoDB, Kinesis or SQS and invokes the Lambda function.
  - a DynamoDB Update event, we can see the structure presented by a DynamoDB stream event.Whenever we add, modify or delete items in the DynamoDB table, DynamoDB can push event data to DynamoDB streams which can then be polled by Lambda.So this event has the DynamoDB table item keys.So we can see that each event source will have its own predefined event data structure, and we write our Lambda function according to the event or events that it needs to process.
  - If we are invoking the Lambda function from our code, using AWS SDK for example, we can have our own custom event structure.
- `Lambda handler also has an optional second argument, called the context object.Let’s understand what all we can do with this context object.`
  - The context object provides us with some useful runtime information while the Lambda function is executing.
  - For example, we can use the context object to find out How much time is remaining before the Lambda function times out, what CloudWatch log group and log stream associated with the Lambda function, what is the AWS request ID of the current invocation of this Lambda function.
- This context object provides different methods and properties which we can use to get this runtime information.
  - if we write, context DOT get remaining time in Millis, this is going to give us the time remaining in milliseconds before the Lambda function times out.This is a method.
  - We also have different properties.
    - context DOT function Name will give us the name of the Lambda function.We can use this to invoke the same Lambda function again, programmatically,using AWS SDK.
    - context DOT function version, that returns the version of the currently executing Lambda function.
    - context DOT function ARN, will give us the ARN of the currently running Lambda function.
    - context DOT AWS Request ID will give us the request ID of the current invocation.
    - Context DOT identity will give us information about the Cognito identity provider,This is useful with the AWS Mobile SDK.
    - `If we’re using AWS Mobile SDK, we can have context DOT client context.And this property can give us additional information about the client application and client device.
      - For example, we could have Client Context DOT client DOT installation ID or App Title.
      - We could also have Client Context DOT Custom to access custom values set by the mobile application
      - We can access environment variables with ENV DOT platform version or make or model and so on`

```
exports.handler = async function(event, context) {
  console.log('Remaining time: ', context.getRemainingTimeInMillis())
  console.log('Function name: ', context.functionName)
  return context.logStreamName
}
```

### Logging and Error handling within Lambda Functions
