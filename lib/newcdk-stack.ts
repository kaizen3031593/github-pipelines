// import { Stack, StackProps } from 'aws-cdk-lib';
// import { Construct } from 'constructs';
// import { GitHubWorkflow } from 'cdk-pipelines-github';
// import { ShellStep } from 'aws-cdk-lib/pipelines';
// import { MyStage } from './my-stage';

// const ACCOUNT = '489318732371';

// export class WorkflowApp extends Stack {
//   constructor(scope: Construct, id: string, props?: StackProps) {
//     super();

//     // const provider = new AwsOidc(this, 'oidc-role', {
//     //   repoString: 'kaizen3031593/github-pipelines',
//     //   provider: iam.OpenIdConnectProvider.fromOpenIdConnectProviderArn(
//     //     this,
//     //     'github',
//     //     'arn:aws:iam::489318732371:oidc-provider/token.actions.githubusercontent.com',
//     //   ),
//     // });

//     const pipeline = new GitHubWorkflow(this, 'pipeline', {
//       synth: new ShellStep('Build', {
//         commands: [
//           'yarn install',
//           'yarn build',
//           'npx cdk synth',
//         ],
//         //primaryOutputDirectory: 'cdk.out',
//       }),
//       //awsOpenIdConnectRole: provider.oidcRole,
//     });

//     pipeline.addStage(new MyStage(this, 'US', { env: { account: ACCOUNT, region: 'us-east-1'}}));
//   }
// }
