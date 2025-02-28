const AWS = require("aws-sdk"); // reference the sdk in js file
// specify the region
const docClient = new AWS.DynamoDB.DocumentClient({ region: "ap-south-1" });
// read
// docClient.get({
//     TableName: "td_notes_sdk",
//     Key: {
//         user_id: "bb",
//         timestamp: 1
//     }
// },(err,data)=>{
//     if(err) console.log(err, err.stack);
//     else console.log(JSON.stringify(data, null, 2));
// });
// query
// docClient.query({
//     TableName: "td_notes_sdk",
//     KeyConditionExpression: "user_id = :uid",
//     ExpressionAttributeValues: {
//         ":uid": "bb"
//     }
// },(err, data)=>{
//     if(err) console.log(err, err.stack);
//     else console.log(JSON.stringify(data, null, 2));
// });
// $ node read-ops
// (node:35456) NOTE: The AWS SDK for JavaScript (v2) is in maintenance mode.
//  SDK releases are limited to address critical bug fixes and security issues only.

// Please migrate your code to use AWS SDK for JavaScript (v3).
// For more information, check the blog post at https://a.co/cUPnyil
// (Use `node --trace-warnings ...` to show where the warning was created)
// {
//   "Items": [
//     {
//       "content": "my content 1",
//       "user_id": "bb",
//       "title": "my title 1",
//       "timestamp": 1
//     },
//     {
//       "content": "my content 2",
//       "user_id": "bb",
//       "title": "my title 2",
//       "timestamp": 2
//     },
//     {
//       "content": "my content 3",
//       "user_id": "bb",
//       "title": "my title 3",
//       "timestamp": 3
//     }
//   ],
//   "Count": 3,
//   "ScannedCount": 3
// }
// query an index
//scan
// docClient.scan(
//   {
//     TableName: "td_notes",
//     FilterExpression: "cat = :cat",
//     ExpressionAttributeValues: {
//       ":cat": "general",
//     },
//   },
//   (err, data) => {
//     if (err) console.log(err, err.stack);
//     else console.log(JSON.stringify(data, null, 2));
//   }
// ); // with scans, we can retrieve items across the partitions
// while query is limited to a single partition.

// batchGet(params, callback) ⇒ AWS.Request
// Returns the attributes of one or more items from one or more tables by delegating to AWS.DynamoDB.batchGetItem()
docClient.batchGet(
  {
    RequestItems: {
      td_notes: {
        Keys: [
          {
            user_id: "qwerty",
            timestamp: 1740660164,
          },
        ],
      },
      td_notes_sdk: {
        Keys: [
          {
            user_id: "bb",
            timestamp: 1,
          },
        ],
      },
    },
  },
  (err, data) => {
    if (err) console.log(err, err.stack);
    else console.log(JSON.stringify(data, null, 2));
  }
);
// $ node read-ops
// (node:25648) NOTE: The AWS SDK for JavaScript (v2) is in maintenance mode.
//  SDK releases are limited to address critical bug fixes and security issues only.

// Please migrate your code to use AWS SDK for JavaScript (v3).
// For more information, check the blog post at https://a.co/cUPnyil
// (Use `node --trace-warnings ...` to show where the warning was created)
// {
//   "Responses": {
//     "td_notes_sdk": [
//       {
//         "content": "my content 1",
//         "user_id": "bb",
//         "title": "my title 1",
//         "timestamp": 1
//       }
//     ],
//     "td_notes": [
//       {
//         "content": "this is content",
//         "user_id": "qwerty",
//         "cat": "general",
//         "timestamp": 1740660164,
//         "note_id": "wert5432",
//         "user_name": "abhi",
//         "title": "my first note"
//       }
//     ]
//   },
//   "UnprocessedKeys": {}
// }
