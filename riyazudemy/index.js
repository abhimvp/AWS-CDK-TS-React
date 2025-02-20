exports.handler = async (event, context) => {
    // since this is an async function , we can use await to wait for the promise to resolve
    // and get the data from the promise (here promise means the fetch function)
    // const data = await fetch("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    event; // gives us the event object which contains the request data
    context; // gives us the context object which contains the runtime information
    context.log; // gives us the log object which we can use to log messages
    context.logStreamName; // gives us the log stream name
    context.getRemainingTimeInMillis(); // gives us time remaining in milliseconds before the Lambda function times out
    context.functionName; // gives us the name of the Lambda function
    context.functionVersion; // gives us the version of the Lambda function
    context.clientContext; // gives us the client context object which contains the client information
    context.clientContext.client.appTitle; // gives us the app title of the client
    context.clientContext.client.appVersionName; // gives us the app version name of the client
    context.identity; // gives us the identity object which contains the identity information
    context.callbackWaitsForEmptyEventLoop; // gives us the callback waits for empty event loop flag
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello World",
    }),
  };
};
