# AWS-CDK-TS-React

- create user for command line interface - AWS CLI - from `AWS IAM` - GO to IAM > users -> create user -> name: cli-access -> attach Administrator Access Policy to be able to deploy resources -> create - Now let's Install AWS CLI - it's already installed -
  ```
    C:\Users\abhis>aws --version
    aws-cli/2.18.1 Python/3.12.6 Windows/11 exe/AMD64
  ```
- the configure aws cli
    ```
    C:\Users\abhis>aws configure
    AWS Access Key ID [****************Abhi]: PROVIDE_ACCESS_KEY_FROM_USER_SECURITY_CREDENTIALS
    AWS Secret Access Key [****************Abhi]: PROVIDE_SECRET_KEY_FROM_USER_SECURITY_CREDENTIALS
    Default region name [us-east-1]: ap-south-1
    Default output format [json]: json
    ```
  - To test it's working do `aws s3 ls` - shouldn't return any error and returns empty as we don't have anything in aws account to list s3 bucket info

# Basics of cloudForamtion and CDK
```
$ npm i -g aws-cdk

added 1 package in 3s
npm notice
npm notice New minor version of npm available! 10.8.2 -> 10.9.0
npm notice Changelog: https://github.com/npm/cli/releases/tag/v10.9.0
npm notice To update run: npm install -g npm@10.9.0
npm notice

abhis@Tinku MINGW64 ~/Desktop/AWS/AWS-CDK-TS-React (main)
$ cdk --version
2.162.1 (build 10aa526)

abhis@Tinku MINGW64 ~/Desktop/AWS/AWS-CDK-TS-React (main)
$ mkdir cdk-starter

abhis@Tinku MINGW64 ~/Desktop/AWS/AWS-CDK-TS-React (main)
$ cd cdk-starter/

abhis@Tinku MINGW64 ~/Desktop/AWS/AWS-CDK-TS-React/cdk-starter (main)
$ cdk init
Available templates:
* app: Template for a CDK Application
   └─ cdk init app --language=[csharp|fsharp|go|java|javascript|python|typescript]
* lib: Template for a CDK Construct Library
   └─ cdk init lib --language=typescript
* sample-app: Example CDK Application with some constructs
   └─ cdk init sample-app --language=[csharp|fsharp|go|java|javascript|python|typescript]

abhis@Tinku MINGW64 ~/Desktop/AWS/AWS-CDK-TS-React/cdk-starter (main)
$ cdk init --language=typescript
Applying project template app for typescript
# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template

Executing npm install...
✅ All done
```
-> bin folder contains the code to initialize our application
-> lib folder contains actual cloud formation stacks
-> In package.json -> "constructs": "^10.0.0", - required for us the types and functionality that will generate CF templates , "ts-node": "^10.9.2", - helps us to execute typescript code
-> cdk.json -> configues the cdk inside this project -> app is the entry point into our project 
- "app": "npx ts-node --prefer-ts-exts bin/cdk-starter.ts" -> execute ts-node library executes typescript code & path to bin folder and our starter file
https://docs.aws.amazon.com/cdk/api/v2/docs/aws-construct-library.html - whole documentation of aws cdk construct - https://github.com/aws/aws-cdk


