const AWS = require("aws-sdk"); // reference the sdk in js file
// specify the region
const docClient = new AWS.DynamoDB.DocumentClient({ region: "ap-south-1" });
// docClient.put({
//     TableName: "td_notes_sdk",
//     Item: { // simple specify the table attributes as key value pairs instead of complex DDB JSON format.
//         user_id: "bb",
//         timestamp: 2,
//         title: "changed title",
//         content: "changed content"
//     }
// },(err,data)=>{
//     if(err) console.log(err, err.stack);
//     else console.log(JSON.stringify(data, null, 2));
// });
// update
// docClient.update({
//     TableName: "td_notes_sdk",
//     Key: {
//         user_id: "bb",
//         timestamp: 2
//     },
//     UpdateExpression: "set title = :t, content = :c",
//     ExpressionAttributeValues: {
//         ":t": "updated title",
//         ":c": "updated content"
//     }
// },(err, data)=>{
//     if(err) console.log(err, err.stack);
//     else console.log(JSON.stringify(data, null, 2));
// });
// delete
// docClient.delete({
//     TableName: "td_notes_sdk",
//     Key: {
//         user_id: "bb",
//         timestamp: 2
//     }
// },(err, data)=>{
//     if(err) console.log(err, err.stack);
//     else console.log(JSON.stringify(data, null, 2));
// });
// batchwrite - allows us to put/delete multiple items at once.
// docClient.batchWrite({
//     RequestItems: {
//         "td_notes_sdk": [
//             {
//                 DeleteRequest: {
//                     Key: {
//                         user_id: "bb",
//                         timestamp: 1
//                     }
//                 }
//             },
//             {
//                 PutRequest: {
//                     Item: {
//                         user_id: "bb",
//                         timestamp: 2,
//                         title: "my title 2",
//                         content: "my content 2"
//                     }
//                 }
//             },
//             {
//                 PutRequest: {
//                     Item: {
//                         user_id: "bb",
//                         timestamp: 3,
//                         title: "my title 3",
//                         content: "my content 3"
//                     }
//                 }
//             }
//         ]
//     }
// },(err, data)=>{
//     if(err) console.log(err, err.stack);
//     else console.log(JSON.stringify(data, null, 2));
// });
