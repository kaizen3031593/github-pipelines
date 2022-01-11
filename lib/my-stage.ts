import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { App, RemovalPolicy, Stack, Stage, StageProps } from 'aws-cdk-lib';

export class MyStage extends Stage {
  constructor(scope: Stack, id: string, props: StageProps = {}) {
    super(scope, id, props);

    const fnStack = new Stack(this, 'FunctionStack');

    const fn = new lambda.Function(fnStack, 'Function', {
      code: lambda.Code.fromInline('mycode'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_14_X,
    });
  }}