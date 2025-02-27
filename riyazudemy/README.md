# Lambda

- will be using node.js and [devGuide](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html)
- npm init - will gives us package.json to install libraries we need
- npm install moment --save

## API Gateway

- refer local written notes

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin

- [request mapping template](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html)
- to create models in APIGW we use json schema https://json-schema.org/learn/miscellaneous-examples
- refer [address schema](https://json-schema.org/learn/json-schema-examples#address)
- Model Mappings

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title":"Calculator Mapping Model",
  "type":"object",
  "properties":{
      "operation":{
          "type":"string"
      },
      "input": {
          "type":"object",
          "properties":{
              "operand1":{
                  "type":"number"
              },
              "operand2":{
                  "type":"number"
              }
          },
          "required":["operand1","operand2"]
          }
  },
  "required":["operation","input"]

}
```

```
{
  "operation": "$input.params('operation')",
  "input": {
    "operand1": $input.json('$.num1'),
    "operand2": $input.json('$.num2')
  }
}
```
