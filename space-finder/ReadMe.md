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