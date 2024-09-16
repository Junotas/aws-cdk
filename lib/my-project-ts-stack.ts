import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3Deploy from "aws-cdk-lib/aws-s3-deployment";
import * as iam from 'aws-cdk-lib/aws-iam';
import { join } from 'path';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';

 // Log the absolute path of website-dist for debugging
 console.log("Asset path:", join(__dirname, "../website-dist"));

export class MyProjectTsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {

    super(scope, id, props);

   

    new CodePipeline(this, 'Pipeline', {
      pipelineName: 'TestPipeline',
      dockerEnabledForSynth: true,
      selfMutation: true,
      dockerEnabledForSelfMutation: true,
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('Junotas/aws-cdk', 'main', {
          authentication: cdk.SecretValue.secretsManager('github-oauth-token')
        }),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth'
        ],
      }),
    });

    const staticPageS3 = new s3.Bucket(this, 'StaticPageS3', {
      bucketName: "nyek-buzow-asdfghjkloissujnmbsaas",
      objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED, // Enforce bucket owner
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicAcls: false,
        ignorePublicAcls: false,
        blockPublicPolicy: false,
        restrictPublicBuckets: false
      }),
      websiteIndexDocument: "index.html",
      cors: [
        {
          allowedMethods: [
            s3.HttpMethods.GET,
          ],
          allowedOrigins: ['*'],
          allowedHeaders: ['*'],
        },
      ],
    });

    // Add a bucket policy to allow public read access
    staticPageS3.addToResourcePolicy(new iam.PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [staticPageS3.arnForObjects('*')],
      principals: [new iam.AnyPrincipal()],
    }));

    new s3Deploy.BucketDeployment(this, "StaticPageS3Deploy", {
      sources: [s3Deploy.Source.asset(join(__dirname, "../website-dist"))],
      destinationBucket: staticPageS3,
    });

  }
}