// Async is a utility module which provides simple and powerful functions for working with asynchronous JS.We are going to use the async module to write a do while loop. The do while loop will keep on fetching the data from the DynamoDB table until there is no more data to fetch.
const async = require("async");
const underscore = require("underscore");
const AWS = require("aws-sdk");
AWS.config.update({
  region: "ap-south-1",
}); // configure the region
const docClient = new AWS.DynamoDB.DocumentClient();
// The doWhilst function takes three arguments. The first argument is the function which will be executed in a loop. The second argument is the function which will be executed to check the condition. The third argument is the function which will be executed once the loop is completed.
// The first argument is the function which will be executed in a loop. The function will scan the DynamoDB table and fetch the data. The startKey is the ExclusiveStartKey which is used to fetch the next set of items from the DynamoDB table.
var startKey = [];
var results = [];
var pages = 0;
async.doWhilst(
  //iteratee
  (callback) => {
    let params = {
      TableName: "td_notes_test",
      Limit: 3,
    };

    if (!_.isEmpty(startKey)) {
      params.ExclusiveStartKey = startKey;
    }

    docClient.scan(params, (err, data) => {
      if (err) {
        console.log(err);
        callback(err, {});
      } else {
        if (typeof data.LastEvaluatedKey !== "undefined") {
          startKey = data.LastEvaluatedKey;
        } else {
          startKey = [];
        }

        if (!_.isEmpty(data.Items)) {
          results = _.union(results, data.Items);
        }

        pages++;

        callback(null, results);
      }
    });
  },

  //truth test
  (results, callback) => {
    if (_.isEmpty(startKey)) {
      return callback(null, false);
    } else {
      return callback(null, true);
    }
  },

  //callback
  (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      console.log("Item Count", data.length);
      console.log("Pages", pages);
    }
  }
);
