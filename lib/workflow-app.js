"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubExampleApp = void 0;
const fs = require("fs");
const os = require("os");
const path = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const codebuild = require("aws-cdk-lib/aws-codebuild");
const lambda = require("aws-cdk-lib/aws-lambda");
const s3 = require("aws-cdk-lib/aws-s3");
const cx_api_1 = require("aws-cdk-lib/cx-api");
const pipelines_1 = require("aws-cdk-lib/pipelines");
const cdk_pipelines_github_1 = require("cdk-pipelines-github");
/**
 * A CDK app that uses GitHub engine backend for CDK Pipelines.
 *
 * Specify the account
 *
 * You will need to bootstrap (with `CDK_NEW_BOOTSTRAP=1`) two environments
 */
class GitHubExampleApp extends aws_cdk_lib_1.App {
    constructor(props) {
        var _a;
        const repoDir = (_a = props.repoDir) !== null && _a !== void 0 ? _a : fs.mkdtempSync(path.join(os.tmpdir(), 'github-engine.'));
        super({
            outdir: path.join(repoDir, 'cdk.out'),
            context: {
                '@aws-cdk/core:newStyleStackSynthesis': '1',
            },
            stackTraces: false,
            autoSynth: false,
            treeMetadata: false,
        });
        const workflowsDir = path.join(repoDir, '.github/workflows');
        fs.mkdirSync(workflowsDir, { recursive: true });
        const pipeline = new cdk_pipelines_github_1.GitHubWorkflow(this, 'Pipeline', {
            synth: new pipelines_1.ShellStep('Build', {
                commands: [
                    'yarn install',
                    'yarn build',
                    'npx cdk synth',
                ],
                primaryOutputDirectory: 'cdk.out',
            }),
            workflowPath: path.join(workflowsDir, 'deploy.yml'),
            dockerCredentials: [
                cdk_pipelines_github_1.DockerCredential.ecr('489318732371.dkr.ecr.us-east-1.amazonaws.com'),
            ],
        });
        const myStage = new MyStage(this, 'StageA', { env: cx_api_1.EnvironmentUtils.parse(props.envA) });
        pipeline.addStage(myStage, {
            pre: [new pipelines_1.ShellStep('Pre', {
                    commands: ['echo hello'],
                })],
            post: [new pipelines_1.ShellStep('Post', {
                    envFromCfnOutputs: {
                        FN_NAME: myStage.fnName,
                    },
                    commands: ['echo FN_NAME equals: $FN_NAME'],
                })],
        });
        pipeline.addStage(new MyStage(this, 'StageB', { env: cx_api_1.EnvironmentUtils.parse(props.envB) }));
    }
}
exports.GitHubExampleApp = GitHubExampleApp;
class MyStage extends aws_cdk_lib_1.Stage {
    constructor(scope, id, props) {
        super(scope, id, props);
        const fnStack = new aws_cdk_lib_1.Stack(this, 'FunctionStack');
        const bucketStack = new aws_cdk_lib_1.Stack(this, 'BucketStack');
        const bucket = new s3.Bucket(bucketStack, 'Bucket', {
            autoDeleteObjects: true,
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
        });
        new codebuild.Project(fnStack, 'MyProject', {
            buildSpec: codebuild.BuildSpec.fromObject({
                version: '0.2',
                phases: {
                    build: {
                        commands: ['ls'],
                    },
                },
            }),
            grantReportGroupPermissions: false,
            environment: {
                buildImage: codebuild.LinuxBuildImage.fromAsset(fnStack, 'MyImage', {
                    directory: path.join(__dirname, 'demo-image'),
                }),
            },
        });
        const fn = new lambda.Function(fnStack, 'Function', {
            code: lambda.Code.fromAsset(path.join(__dirname, 'fixtures')),
            handler: 'index.handler',
            runtime: lambda.Runtime.NODEJS_14_X,
            environment: {
                BUCKET_NAME: bucket.bucketName,
            },
        });
        this.fnName = new aws_cdk_lib_1.CfnOutput(fnStack, 'myout', {
            value: fn.functionName,
        });
        bucket.grantRead(fn);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2Zsb3ctYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid29ya2Zsb3ctYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlCQUF5QjtBQUN6Qix5QkFBeUI7QUFDekIsNkJBQTZCO0FBQzdCLDZDQUFzRjtBQUN0Rix1REFBdUQ7QUFDdkQsaURBQWlEO0FBQ2pELHlDQUF5QztBQUN6QywrQ0FBc0Q7QUFDdEQscURBQWtEO0FBQ2xELCtEQUF3RTtBQThCeEU7Ozs7OztHQU1HO0FBQ0gsTUFBYSxnQkFBaUIsU0FBUSxpQkFBRztJQUN2QyxZQUFZLEtBQTRCOztRQUN0QyxNQUFNLE9BQU8sU0FBRyxLQUFLLENBQUMsT0FBTyxtQ0FBSSxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUUxRixLQUFLLENBQUM7WUFDSixNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDO1lBQ3JDLE9BQU8sRUFBRTtnQkFDUCxzQ0FBc0MsRUFBRSxHQUFHO2FBQzVDO1lBQ0QsV0FBVyxFQUFFLEtBQUs7WUFDbEIsU0FBUyxFQUFFLEtBQUs7WUFDaEIsWUFBWSxFQUFFLEtBQUs7U0FDcEIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUM3RCxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRWhELE1BQU0sUUFBUSxHQUFHLElBQUkscUNBQWMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQ3BELEtBQUssRUFBRSxJQUFJLHFCQUFTLENBQUMsT0FBTyxFQUFFO2dCQUM1QixRQUFRLEVBQUU7b0JBQ1IsY0FBYztvQkFDZCxZQUFZ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QUFFLE1BQU0sQ0FBQyxVQUFVO2FBQy9CO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLHVCQUFTLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRTtZQUM1QyxLQUFLLEVBQUUsRUFBRSxDQUFDLFlBQVk7U0FDdkIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN2QixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XG5pbXBvcnQgKiBhcyBvcyBmcm9tICdvcyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQXBwLCBDZm5PdXRwdXQsIFJlbW92YWxQb2xpY3ksIFN0YWNrLCBTdGFnZSwgU3RhZ2VQcm9wcyB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCAqIGFzIGNvZGVidWlsZCBmcm9tICdhd3MtY2RrLWxpYi9hd3MtY29kZWJ1aWxkJztcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbGFtYmRhJztcbmltcG9ydCAqIGFzIHMzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1zMyc7XG5pbXBvcnQgeyBFbnZpcm9ubWVudFV0aWxzIH0gZnJvbSAnYXdzLWNkay1saWIvY3gtYXBpJztcbmltcG9ydCB7IFNoZWxsU3RlcCB9IGZyb20gJ2F3cy1jZGstbGliL3BpcGVsaW5lcyc7XG5pbXBvcnQgeyBHaXRIdWJXb3JrZmxvdywgRG9ja2VyQ3JlZGVudGlhbCB9IGZyb20gJ2Nkay1waXBlbGluZXMtZ2l0aHViJztcblxuZXhwb3J0IGludGVyZmFjZSBHaXRIdWJFeGFtcGxlQXBwUHJvcHMge1xuICAvKipcbiAgICogVGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoZSByZXBvc2l0b3J5LlxuICAgKlxuICAgKiBBIGBjZGsub3V0YCBkaXJlY3RvcnkgYW5kIGAuZ2l0aHViL3dvcmtmbG93cy9kZXBsb3kueW1sYCBmaWxlIHdpbGwgYmVcbiAgICogc3ludGhlc2llZCBpbnRvIHRoaXMgZGlyZWN0b3J5LlxuICAgKi9cbiAgcmVhZG9ubHkgcmVwb0Rpcjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBV1MgRW52aXJvbm1lbnQgZm9yIHN0YWdlIEEuXG4gICAqXG4gICAqIEVudmlyb25tZW50IG11c3QgYmUgYm9vdHN0cmFwcGVkIHdpdGggYENES19ORVdfQk9PVFNUUkFQPTFgLlxuICAgKlxuICAgKiBAZXhhbXBsZSBhd3M6Ly8xMTExMTExMTExMTEvdXMtZWFzdC0xXG4gICAqL1xuICByZWFkb25seSBlbnZBOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEFXUyBlbnZpcm9ubWVudCBmb3Igc3RhZ2UgQi5cbiAgICpcbiAgICogRW52aXJvbm1lbnQgbXVzdCBiZSBib290c3RyYXBwZWQgd2l0aCBgQ0RLX05FV19CT09UU1RSQVA9MWAuXG4gICAqXG4gICAqIEBleGFtcGxlIGF3czovLzExMTExMTExMTExMS91cy1lYXN0LTJcbiAgICovXG4gIHJlYWRvbmx5IGVudkI6IHN0cmluZztcbn1cblxuLyoqXG4gKiBBIENESyBhcHAgdGhhdCB1c2VzIEdpdEh1YiBlbmdpbmUgYmFja2VuZCBmb3IgQ0RLIFBpcGVsaW5lcy5cbiAqXG4gKiBTcGVjaWZ5IHRoZSBhY2NvdW50XG4gKlxuICogWW91IHdpbGwgbmVlZCB0byBib290c3RyYXAgKHdpdGggYENES19ORVdfQk9PVFNUUkFQPTFgKSB0d28gZW52aXJvbm1lbnRzXG4gKi9cbmV4cG9ydCBjbGFzcyBHaXRIdWJFeGFtcGxlQXBwIGV4dGVuZHMgQXBwIHtcbiAgY29uc3RydWN0b3IocHJvcHM6IEdpdEh1YkV4YW1wbGVBcHBQcm9wcykge1xuICAgIGNvbnN0IHJlcG9EaXIgPSBwcm9wcy5yZXBvRGlyID8/IGZzLm1rZHRlbXBTeW5jKHBhdGguam9pbihvcy50bXBkaXIoKSwgJ2dpdGh1Yi1lbmdpbmUuJykpO1xuXG4gICAgc3VwZXIoe1xuICAgICAgb3V0ZGlyOiBwYXRoLmpvaW4ocmVwb0RpciwgJ2Nkay5vdXQnKSxcbiAgICAgIGNvbnRleHQ6IHtcbiAgICAgICAgJ0Bhd3MtY2RrL2NvcmU6bmV3U3R5bGVTdGFja1N5bnRoZXNpcyc6ICcxJyxcbiAgICAgIH0sXG4gICAgICBzdGFja1RyYWNlczogZmFsc2UsXG4gICAgICBhdXRvU3ludGg6IGZhbHNlLFxuICAgICAgdHJlZU1ldGFkYXRhOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIGNvbnN0IHdvcmtmbG93c0RpciA9IHBhdGguam9pbihyZXBvRGlyLCAnLmdpdGh1Yi93b3JrZmxvd3MnKTtcbiAgICBmcy5ta2RpclN5bmMod29ya2Zsb3dzRGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcblxuICAgIGNvbnN0IHBpcGVsaW5lID0gbmV3IEdpdEh1YldvcmtmbG93KHRoaXMsICdQaXBlbGluZScsIHtcbiAgICAgIHN5bnRoOiBuZXcgU2hlbGxTdGVwKCdCdWlsZCcsIHtcbiAgICAgICAgY29tbWFuZHM6IFtcbiAgICAgICAgICAneWFybiBpbnN0YWxsJyxcbiAgICAgICAgICAneWFybiBidWlsZCcsXG4gICAgICAgICAgJ25weCBjZGsgc3ludGgnLFxuICAgICAgICBdLFxuICAgICAgICBwcmltYXJ5T3V0cHV0RGlyZWN0b3J5OiAnY2RrLm91dCcsXG4gICAgICB9KSxcbiAgICAgIHdvcmtmbG93UGF0aDogcGF0aC5qb2luKHdvcmtmbG93c0RpciwgJ2RlcGxveS55bWwnKSxcbiAgICAgIGRvY2tlckNyZWRlbnRpYWxzOiBbXG4gICAgICAgIERvY2tlckNyZWRlbnRpYWwuZWNyKCc0ODkzMTg3MzIzNzEuZGtyLmVjci51cy1lYXN0LTEuYW1hem9uYXdzLmNvbScpLFxuICAgICAgXSxcbiAgICB9KTtcblxuICAgIGNvbnN0IG15U3RhZ2UgPSBuZXcgTXlTdGFnZSh0aGlzLCAnU3RhZ2VBJywgeyBlbnY6IEVudmlyb25tZW50VXRpbHMucGFyc2UocHJvcHMuZW52QSkgfSk7XG4gICAgcGlwZWxpbmUuYWRkU3RhZ2UobXlTdGFnZSwge1xuICAgICAgcHJlOiBbbmV3IFNoZWxsU3RlcCgnUHJlJywge1xuICAgICAgICBjb21tYW5kczogWydlY2hvIGhlbGxvJ10sXG4gICAgICB9KV0sXG4gICAgICBwb3N0OiBbbmV3IFNoZWxsU3RlcCgnUG9zdCcsIHtcbiAgICAgICAgZW52RnJvbUNmbk91dHB1dHM6IHtcbiAgICAgICAgICBGTl9OQU1FOiBteVN0YWdlLmZuTmFtZSxcbiAgICAgICAgfSxcbiAgICAgICAgY29tbWFuZHM6IFsnZWNobyBGTl9OQU1FIGVxdWFsczogJEZOX05BTUUnXSxcbiAgICAgIH0pXSxcbiAgICB9KTtcblxuICAgIHBpcGVsaW5lLmFkZFN0YWdlKG5ldyBNeVN0YWdlKHRoaXMsICdTdGFnZUInLCB7IGVudjogRW52aXJvbm1lbnRVdGlscy5wYXJzZShwcm9wcy5lbnZCKSB9KSk7XG4gIH1cbn1cblxuY2xhc3MgTXlTdGFnZSBleHRlbmRzIFN0YWdlIHtcbiAgcHVibGljIHJlYWRvbmx5IGZuTmFtZTogQ2ZuT3V0cHV0O1xuICBjb25zdHJ1Y3RvcihzY29wZTogQXBwLCBpZDogc3RyaW5nLCBwcm9wczogU3RhZ2VQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgY29uc3QgZm5TdGFjayA9IG5ldyBTdGFjayh0aGlzLCAnRnVuY3Rpb25TdGFjaycpO1xuICAgIGNvbnN0IGJ1Y2tldFN0YWNrID0gbmV3IFN0YWNrKHRoaXMsICdCdWNrZXRTdGFjaycpO1xuXG4gICAgY29uc3QgYnVja2V0ID0gbmV3IHMzLkJ1Y2tldChidWNrZXRTdGFjaywgJ0J1Y2tldCcsIHtcbiAgICAgIGF1dG9EZWxldGVPYmplY3RzOiB0cnVlLFxuICAgICAgcmVtb3ZhbFBvbGljeTogUmVtb3ZhbFBvbGljeS5ERVNUUk9ZLFxuICAgIH0pO1xuXG4gICAgbmV3IGNvZGVidWlsZC5Qcm9qZWN0KGZuU3RhY2ssICdNeVByb2plY3QnLCB7XG4gICAgICBidWlsZFNwZWM6IGNvZGVidWlsZC5CdWlsZFNwZWMuZnJvbU9iamVjdCh7XG4gICAgICAgIHZlcnNpb246ICcwLjInLFxuICAgICAgICBwaGFzZXM6IHtcbiAgICAgICAgICBidWlsZDoge1xuICAgICAgICAgICAgY29tbWFuZHM6IFsnbHMnXSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgICBncmFudFJlcG9ydEdyb3VwUGVybWlzc2lvbnM6IGZhbHNlLFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgYnVpbGRJbWFnZTogY29kZWJ1aWxkLkxpbnV4QnVpbGRJbWFnZS5mcm9tQXNzZXQoZm5TdGFjaywgJ015SW1hZ2UnLCB7XG4gICAgICAgICAgZGlyZWN0b3J5OiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnZGVtby1pbWFnZScpLFxuICAgICAgICB9KSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCBmbiA9IG5ldyBsYW1iZGEuRnVuY3Rpb24oZm5TdGFjaywgJ0Z1bmN0aW9uJywge1xuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KHBhdGguam9pbihfX2Rpcm5hbWUsICdmaXh0dXJlcycpKSxcbiAgICAgIGhhbmRsZXI6ICdpbmRleC5oYW5kbGVyJyxcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xNF9YLFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgQlVDS0VUX05BTUU6IGJ1Y2tldC5idWNrZXROYW1lLCAvLyA8LS0gY3Jvc3Mgc3RhY2sgcmVmZXJlbmNlXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgdGhpcy5mbk5hbWUgPSBuZXcgQ2ZuT3V0cHV0KGZuU3RhY2ssICdteW91dCcsIHtcbiAgICAgIHZhbHVlOiBmbi5mdW5jdGlvbk5hbWUsXG4gICAgfSk7XG5cbiAgICBidWNrZXQuZ3JhbnRSZWFkKGZuKTtcbiAgfVxufSJdfQ==