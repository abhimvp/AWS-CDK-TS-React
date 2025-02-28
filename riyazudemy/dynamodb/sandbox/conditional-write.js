const AWS = require("aws-sdk"); // reference the sdk in js file
// specify the region
const docClient = new AWS.DynamoDB.DocumentClient({ region: "ap-south-1" });
// conditional write
docClient.put({
    TableName: "td_notes_sdk",
    Item: { // simple specify the table attributes as key value pairs instead of complex DDB JSON format.
        user_id: "bb",
        timestamp: 1,
        title: "my title 4",
        content: "my content 4"
    },
    ConditionExpression: "attribute_not_exists(user_id)" // this will check if the user_id attribute is not present in the table.
},(err,data)=>{
    if(err) console.log(err, err.stack);
    else console.log(JSON.stringify(data, null, 2));
});