const AWS = require("aws-sdk"); // reference the sdk in js file
// specify the region
const dynamodb = new AWS.DynamoDB({ region: "ap-south-1" });

// var params = {};
// dynamodb.listTables(params,(err,data)=>{
//     if(err) console.log(err, err.stack);
//     else console.log(data);
// })
// dynamodb.describeTable({TableName:'td_notes_sdk'},(err,data)=>{
//     if(err) console.log(err, err.stack);
//     else console.log(JSON.stringify(data, null, 2));
// })
// create table
params = {
  TableName: "td_notes_sdk",
  KeySchema: [
    { AttributeName: "user_id", KeyType: "HASH" },
    { AttributeName: "timestamp", KeyType: "RANGE" },
  ],
  AttributeDefinitions: [
    { AttributeName: "user_id", AttributeType: "S" },
    { AttributeName: "timestamp", AttributeType: "N" },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
};
dynamodb.createTable(params, (err, data) => {
  if (err) console.log(err, err.stack);
  else console.log(JSON.stringify(data, null, 2));
});
// update the RCUs to 2
// dynamodb.updateTable({
//   TableName: "td_notes_sdk",
//   ProvisionedThroughput: {
//     ReadCapacityUnits: 2,
//     WriteCapacityUnits: 1,
//   },
// },(err,data)=>{
//     if(err) console.log(err, err.stack);
//     else console.log(JSON.stringify(data, null, 2));
// });
// delete the table
// dynamodb.deleteTable({ TableName: "td_notes_sdk" }, (err, data) => {
//   if (err) console.log(err, err.stack);
//   else console.log(JSON.stringify(data, null, 2));
// });