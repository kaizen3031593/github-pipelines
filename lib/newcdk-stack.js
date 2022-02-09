"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3Y2RrLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmV3Y2RrLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxtREFBbUQ7QUFDbkQsMENBQTBDO0FBQzFDLHlEQUF5RDtBQUN6RCxxREFBcUQ7QUFDckQsd0NBQXdDO0FBRXhDLGtDQUFrQztBQUVsQywyQ0FBMkM7QUFDM0Msb0VBQW9FO0FBQ3BFLGVBQWU7QUFFZiwyREFBMkQ7QUFDM0QseURBQXlEO0FBQ3pELDZFQUE2RTtBQUM3RSxtQkFBbUI7QUFDbkIsdUJBQXVCO0FBQ3ZCLDRGQUE0RjtBQUM1RixjQUFjO0FBQ2QsYUFBYTtBQUViLDhEQUE4RDtBQUM5RCx3Q0FBd0M7QUFDeEMsc0JBQXNCO0FBQ3RCLDRCQUE0QjtBQUM1QiwwQkFBMEI7QUFDMUIsNkJBQTZCO0FBQzdCLGFBQWE7QUFDYiwrQ0FBK0M7QUFDL0MsWUFBWTtBQUNaLG1EQUFtRDtBQUNuRCxVQUFVO0FBRVYsb0dBQW9HO0FBQ3BHLE1BQU07QUFDTixJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IHsgU3RhY2ssIFN0YWNrUHJvcHMgfSBmcm9tICdhd3MtY2RrLWxpYic7XG4vLyBpbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbi8vIGltcG9ydCB7IEdpdEh1YldvcmtmbG93IH0gZnJvbSAnY2RrLXBpcGVsaW5lcy1naXRodWInO1xuLy8gaW1wb3J0IHsgU2hlbGxTdGVwIH0gZnJvbSAnYXdzLWNkay1saWIvcGlwZWxpbmVzJztcbi8vIGltcG9ydCB7IE15U3RhZ2UgfSBmcm9tICcuL215LXN0YWdlJztcblxuLy8gY29uc3QgQUNDT1VOVCA9ICc0ODkzMTg3MzIzNzEnO1xuXG4vLyBleHBvcnQgY2xhc3MgV29ya2Zsb3dBcHAgZXh0ZW5kcyBTdGFjayB7XG4vLyAgIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuLy8gICAgIHN1cGVyKCk7XG5cbi8vICAgICAvLyBjb25zdCBwcm92aWRlciA9IG5ldyBBd3NPaWRjKHRoaXMsICdvaWRjLXJvbGUnLCB7XG4vLyAgICAgLy8gICByZXBvU3RyaW5nOiAna2FpemVuMzAzMTU5My9naXRodWItcGlwZWxpbmVzJyxcbi8vICAgICAvLyAgIHByb3ZpZGVyOiBpYW0uT3BlbklkQ29ubmVjdFByb3ZpZGVyLmZyb21PcGVuSWRDb25uZWN0UHJvdmlkZXJBcm4oXG4vLyAgICAgLy8gICAgIHRoaXMsXG4vLyAgICAgLy8gICAgICdnaXRodWInLFxuLy8gICAgIC8vICAgICAnYXJuOmF3czppYW06OjQ4OTMxODczMjM3MTpvaWRjLXByb3ZpZGVyL3Rva2VuLmFjdGlvbnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tJyxcbi8vICAgICAvLyAgICksXG4vLyAgICAgLy8gfSk7XG5cbi8vICAgICBjb25zdCBwaXBlbGluZSA9IG5ldyBHaXRIdWJXb3JrZmxvdyh0aGlzLCAncGlwZWxpbmUnLCB7XG4vLyAgICAgICBzeW50aDogbmV3IFNoZWxsU3RlcCgnQnVpbGQnLCB7XG4vLyAgICAgICAgIGNvbW1hbmRzOiBbXG4vLyAgICAgICAgICAgJ3lhcm4gaW5zdGFsbCcsXG4vLyAgICAgICAgICAgJ3lhcm4gYnVpbGQnLFxuLy8gICAgICAgICAgICducHggY2RrIHN5bnRoJyxcbi8vICAgICAgICAgXSxcbi8vICAgICAgICAgLy9wcmltYXJ5T3V0cHV0RGlyZWN0b3J5OiAnY2RrLm91dCcsXG4vLyAgICAgICB9KSxcbi8vICAgICAgIC8vYXdzT3BlbklkQ29ubmVjdFJvbGU6IHByb3ZpZGVyLm9pZGNSb2xlLFxuLy8gICAgIH0pO1xuXG4vLyAgICAgcGlwZWxpbmUuYWRkU3RhZ2UobmV3IE15U3RhZ2UodGhpcywgJ1VTJywgeyBlbnY6IHsgYWNjb3VudDogQUNDT1VOVCwgcmVnaW9uOiAndXMtZWFzdC0xJ319KSk7XG4vLyAgIH1cbi8vIH1cbiJdfQ==