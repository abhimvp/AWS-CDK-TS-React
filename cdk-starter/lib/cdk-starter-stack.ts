import * as cdk from 'aws-cdk-lib';
import { CfnOutput } from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

class L3Bucket extends Construct{
  constructor(scope: Construct, id: string , expiration: number) {
    super(scope, id);
    new Bucket(this,'L3Bucket',{
      lifecycleRules:[{
        expiration: cdk.Duration.days(expiration)
      }]
    });
  }
}

export class CdkStarterStack extends cdk.Stack { // empty cloudformation stack
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create s3 bucket in 3 ways
    //let's see L1 construct
    new CfnBucket(this,'MyL1Bucket',{
     lifecycleConfiguration:{
      rules:[{
        expirationInDays:1,
        status:'Enabled'
      }]
     }
    });
    // let's see L2 Construct
    const myL2Bucket = new Bucket(this,'MyL2Bucket',{
      lifecycleRules:[{
        expiration: cdk.Duration.days(4)
      }]
    });
    // console.log('bucket name '+myL2Bucket.bucketName); // test this with cdk synth
    new CfnOutput(this,'MyL2BucketName',{
      value:myL2Bucket.bucketName
    });
    // let's see L3 Construct
    new L3Bucket(this,'MyL3Bucket',3);
  }
}
