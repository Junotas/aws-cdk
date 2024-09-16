import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  aws_s3 as s3,
  aws_cloudfront as cloudfront,
  aws_s3_deployment as s3deploy,
  aws_cloudfront_origins as origins,
  RemovalPolicy,
} from 'aws-cdk-lib';

export class MyStaticWebsiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3 Bucket to store website files
    const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
      bucketName: 'nyek-buzow-asdfghjkloissujnmbsaas',
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      // Optional: Automatically delete bucket when the stack is destroyed
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // Origin Access Identity for CloudFront to access S3
    const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, 'OAI');

    // Grant read permissions to CloudFront OAI
    websiteBucket.grantRead(originAccessIdentity);

    // CloudFront distribution
    const distribution = new cloudfront.Distribution(this, 'WebsiteDistribution', {
      defaultRootObject: 'index.html',
      defaultBehavior: {
        origin: new origins.S3Origin(websiteBucket, { originAccessIdentity }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.minutes(5),
        },
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.minutes(5),
        },
      ],
    });

    // Deploy website contents to S3 bucket
    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3deploy.Source.asset('./website-dist')],
      destinationBucket: websiteBucket,
      distribution,
      distributionPaths: ['/*'], // Invalidate cache after deployment
    });

    // Output the CloudFront URL
    new cdk.CfnOutput(this, 'CloudFrontURL', {
      value: distribution.distributionDomainName,
    });
  }
}