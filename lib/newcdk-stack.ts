import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { GitHubWorkflow } from 'cdk-pipelines-github';
import { ShellStep } from 'aws-cdk-lib/pipelines';
import { MyStage } from './my-stage';

const ACCOUNT = '489318732371';

export class NewcdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new GitHubWorkflow(this, 'pipeline', {
      synth: new ShellStep('Build', {
        commands: [
          'yarn install',
          'yarn build',
          'npx cdk synth',
        ],
      }),
    });

    pipeline.addStage(new MyStage(this, 'US', { env: { account: ACCOUNT, region: 'us-east-1'}}));
  }
}
