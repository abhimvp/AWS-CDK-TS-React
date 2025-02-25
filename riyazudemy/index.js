const greeting = {
  en: "Hello",
  es: "Hola",
  fr: "Bonjour",
  hi: "Namaste",
};

const moment = require("moment");

exports.handler = async (event) => {
  let name = event.pathParameters.name; // since the request is coming from API Gateway , we can see the sample payload from the configure test event in lambda console and based on that we can extract the data from event object , so always check the sample payload in the configure test event in lambda console
  let { lang, ...info } = event.queryStringParameters; // language will go into lang parameter and the rest of the parameters will go into info parameter
  let message = `${greeting[lang]} ? greeting[lang] : greeting["en"] } ${name}`;
  let response = {
    message: message,
    info: info,
    timestamp: moment().unix(),
  };

  // return response; not a good HTTP response object that API Gateway expects
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};

// exports.handler = async (event, context) => {
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
// };
