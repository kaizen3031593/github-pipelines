import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as path from 'path';
import { RemovalPolicy, App, Stack, Stage, StageProps } from 'aws-cdk-lib';

export class MyStage extends Stage {
  constructor(scope: App, id: string, props: StageProps = {}) {
    super(scope, id, props);

    const fnStack = new Stack(this, 'FunctionStack');
    const bucketStack = new Stack(this, 'BucketStack');

    const bucket = new s3.Bucket(bucketStack, 'Bucket', {
      autoDeleteObjects: true,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    // new codebuild.Project(fnStack, 'MyProject', {
    //   buildSpec: codebuild.BuildSpec.fromObject({
    //     version: '0.2',
    //     phases: {
    //       build: {
    //         commands: ['ls'],
    //       },
    //     },
    //   }),
    //   grantReportGroupPermissions: false,
    //   environment: {
    //     buildImage: codebuild.LinuxBuildImage.fromAsset(fnStack, 'MyImage', {
    //       directory: path.join(__dirname, '..', 'demo-image'),
    //     }),
    //   },
    // });

    const fn = new lambda.Function(fnStack, 'Function', {
      code: lambda.Code.fromAsset(path.join(__dirname, '..', 'lambda')),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_14_X,
      environment: {
        BUCKET_NAME: bucket.bucketName, // <-- cross stack reference
      },
    });

    bucket.grantRead(fn);
  }
}