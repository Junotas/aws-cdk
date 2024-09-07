import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3Deploy from "aws-cdk-lib/aws-s3-deployment"
import { join } from 'path';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class MyProjectTsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const staticPageS3 = new s3.Bucket(this, 'StaticPageS3', {
      bucketName: "",
      publicReadAccess: true,
      websiteIndexDocument: "index.html",
      cors: [
          {
              allowedMethods: [
                  s3.HttpMethods.GET,
              ],
              allowedOrigins: ['*'],
              allowedHeaders: ['*'],
          },
      ]
  });
  new s3Deploy.BucketDeployment(this, "StaticPageS3Deploy", {
      sources: [s3Deploy.Source.asset(join(__dirname, "../website-dist"))],
      destinationBucket: staticPageS3,
  });
  }
}
