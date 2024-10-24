### Debugging AWS Lambda

In general , to test a little change:
we have to deploy , invoke lambda , read cloudwatch logs - it's big right , can we do it simpler in vscode itself?

- use Vscode to debug aws lambda
  - for this to work we need to have ts-node library installed `"ts-node": "^10.9.2"`
  - go to run and debug in vscode (ctrl+shift+D)
  - click on `create a launch.json file`
  - then we see a new folder `.vscode` & inside it `launch.json` file & this folder needs to be in root project of package.json file - after configuring that file
  - we need to configure a way in which we are invoking our lambda - create a test folder inside it a luncher.ts and call our handler and then add breakpoints in the actual handler file
  - keep the launcher.ts file open and run the debug - it should give u the details

### Lambda Architecture

https://stackoverflow.com/questions/41425511/aws-api-gateway-lambda-multiple-endpoint-functions-vs-single-endpoint
![alt text](images/image.png)
![alt text](images/image-1.png)
![alt text](images/image-2.png)
![alt text](images/image-3.png)
![alt text](images/image-4.png)

### Implementation of our lambda

the lambda defined in the hello.ts will serve the spaces table
create spaces folder which serves the spaces table inside services folder

# AWS DynamoDB with CDK and Lambda

![alt text](images/image-5.png)
![alt text](images/image-6.png)
With DynamoDB we can write simple queries not complicated queries like SQL
![alt text](images/image-7.png)

### Put Item

- In order for us to implement AWS dynamoDB we need to import it's SDK , we need to install it `npm i @aws-sdk/client-dynamodb`.
- When we are creating a entry into a DynamoDB , we need to pass it a ID , before even getting the data from our event, we should have a random ID.
- Also lambda needs to have permission to write to dynamoDB
- How we can get fast feedback from our implementation

### Scan operation

- when we do local testing GET scanCOmmand we get items from our table and that is a marshalled result { S: spaceId }

### GetItem Operation

### Marshalling

- when we retrive from our DB we get result wrapped inside an object which states their types id : { S: spaceId**\*\***\***\*\*** } which doesn't ook great
- when we put items into our DB we need to take each property of our item and specify it's type otherwose we will get error - cannot read properties of undefined when we make query with dynamoDB

```
Item: {
        id: { S: randomID },
        location: { S: item.location },
      },
```

- There are two solutions with this small problem - marshalling or unmarshalling
  - marshalling will add above kind of attribute type defintions to our object
  - unmarshalling will remove this attribute types right there
  - both of them part of `npm i @aws-sdk/util-dynamodb`
  - other is using DDBDocumentClient `npm i @aws-sdk/lib-dynamodb`

### Update Item

- request type PUT
- add queryParameter and content

### Data validation with Typescript

- Here firstly we have to think how we want our files to look like, because at some point this backend application will be linked to frontend and the way `they will communicate it will be by an interface`.SO the backend and frontend must come together and know what exact type of objects they will expect.
- create `Model` file - Think about how our reservation , our space entry will look like
- Let's create a function which will assert certain entries as space entry or not in `shared` Folder - what's contained in this folder will be shared with multiple lambdas

### DB queries deployment and test
