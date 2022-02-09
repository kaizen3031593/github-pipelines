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
            buildContainer: { image: 'alpine' },
            preBuildSteps: [
                {
                    uses: 'actions/setup-node@v2',
                    with: { nodeVersion: '14' },
                },
            ],
            postBuildSteps: [
                { run: 'echo post-build' },
            ],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2Zsb3ctYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid29ya2Zsb3ctYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlCQUF5QjtBQUN6Qix5QkFBeUI7QUFDekIsNkJBQTZCO0FBQzdCLDZDQUFzRjtBQUN0Rix1REFBdUQ7QUFDdkQsaURBQWlEO0FBQ2pELHlDQUF5QztBQUN6QywrQ0FBc0Q7QUFDdEQscURBQWtEO0FBQ2xELCtEQUF3RTtBQThCeEU7Ozs7OztHQU1HO0FBQ0gsTUFBYSxnQkFBaUIsU0FBUSxpQkFBRztJQUN2QyxZQUFZLEtBQTRCOztRQUN0QyxNQUFNLE9BQU8sU0FBRyxLQUFLLENBQUMsT0FBTyxtQ0FBSSxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUUxRixLQUFLLENBQUM7WUFDSixNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDO1lBQ3JDLE9BQU8sRUFBRTtnQkFDUCxzQ0FBc0MsRUFBRSxHQUFHO2FBQzVDO1lBQ0QsV0FBVyxFQUFFLEtBQUs7WUFDbEIsU0FBUyxFQUFFLEtBQUs7WUFDaEIsWUFBWSxFQUFFLEtBQUs7U0FDcEIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUM3RCxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRWhELE1BQU0sUUFBUSxHQUFHLElBQUkscUNBQWMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQ3BELEtBQUssRUFBRSxJQUFJLHFCQUFTLENBQUMsT0FBTyxFQUFFO2dCQUM1QixRQUFRLEVBQUU7b0JBQ1IsY0FBYztvQkFDZCxZQUFZ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RSxVQUFVLEVBQUU7WUFDbEQsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQzdELE9BQU8sRUFBRSxlQUFlO1lBQ3hCLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsV0FBVyxFQUFFO2dCQUNYLFdBQVcsRUFBRSxNQUFNLENBQUMsVUFBVTthQUMvQjtTQUNGLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSx1QkFBUyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUU7WUFDNUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxZQUFZO1NBQ3ZCLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdkIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuaW1wb3J0ICogYXMgb3MgZnJvbSAnb3MnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IEFwcCwgQ2ZuT3V0cHV0LCBSZW1vdmFsUG9saWN5LCBTdGFjaywgU3RhZ2UsIFN0YWdlUHJvcHMgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBjb2RlYnVpbGQgZnJvbSAnYXdzLWNkay1saWIvYXdzLWNvZGVidWlsZCc7XG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSAnYXdzLWNkay1saWIvYXdzLWxhbWJkYSc7XG5pbXBvcnQgKiBhcyBzMyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtczMnO1xuaW1wb3J0IHsgRW52aXJvbm1lbnRVdGlscyB9IGZyb20gJ2F3cy1jZGstbGliL2N4LWFwaSc7XG5pbXBvcnQgeyBTaGVsbFN0ZXAgfSBmcm9tICdhd3MtY2RrLWxpYi9waXBlbGluZXMnO1xuaW1wb3J0IHsgR2l0SHViV29ya2Zsb3csIERvY2tlckNyZWRlbnRpYWwgfSBmcm9tICdjZGstcGlwZWxpbmVzLWdpdGh1Yic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2l0SHViRXhhbXBsZUFwcFByb3BzIHtcbiAgLyoqXG4gICAqIFRoZSByb290IGRpcmVjdG9yeSBvZiB0aGUgcmVwb3NpdG9yeS5cbiAgICpcbiAgICogQSBgY2RrLm91dGAgZGlyZWN0b3J5IGFuZCBgLmdpdGh1Yi93b3JrZmxvd3MvZGVwbG95LnltbGAgZmlsZSB3aWxsIGJlXG4gICAqIHN5bnRoZXNpZWQgaW50byB0aGlzIGRpcmVjdG9yeS5cbiAgICovXG4gIHJlYWRvbmx5IHJlcG9EaXI6IHN0cmluZztcblxuICAvKipcbiAgICogQVdTIEVudmlyb25tZW50IGZvciBzdGFnZSBBLlxuICAgKlxuICAgKiBFbnZpcm9ubWVudCBtdXN0IGJlIGJvb3RzdHJhcHBlZCB3aXRoIGBDREtfTkVXX0JPT1RTVFJBUD0xYC5cbiAgICpcbiAgICogQGV4YW1wbGUgYXdzOi8vMTExMTExMTExMTExL3VzLWVhc3QtMVxuICAgKi9cbiAgcmVhZG9ubHkgZW52QTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBV1MgZW52aXJvbm1lbnQgZm9yIHN0YWdlIEIuXG4gICAqXG4gICAqIEVudmlyb25tZW50IG11c3QgYmUgYm9vdHN0cmFwcGVkIHdpdGggYENES19ORVdfQk9PVFNUUkFQPTFgLlxuICAgKlxuICAgKiBAZXhhbXBsZSBhd3M6Ly8xMTExMTExMTExMTEvdXMtZWFzdC0yXG4gICAqL1xuICByZWFkb25seSBlbnZCOiBzdHJpbmc7XG59XG5cbi8qKlxuICogQSBDREsgYXBwIHRoYXQgdXNlcyBHaXRIdWIgZW5naW5lIGJhY2tlbmQgZm9yIENESyBQaXBlbGluZXMuXG4gKlxuICogU3BlY2lmeSB0aGUgYWNjb3VudFxuICpcbiAqIFlvdSB3aWxsIG5lZWQgdG8gYm9vdHN0cmFwICh3aXRoIGBDREtfTkVXX0JPT1RTVFJBUD0xYCkgdHdvIGVudmlyb25tZW50c1xuICovXG5leHBvcnQgY2xhc3MgR2l0SHViRXhhbXBsZUFwcCBleHRlbmRzIEFwcCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzOiBHaXRIdWJFeGFtcGxlQXBwUHJvcHMpIHtcbiAgICBjb25zdCByZXBvRGlyID0gcHJvcHMucmVwb0RpciA/PyBmcy5ta2R0ZW1wU3luYyhwYXRoLmpvaW4ob3MudG1wZGlyKCksICdnaXRodWItZW5naW5lLicpKTtcblxuICAgIHN1cGVyKHtcbiAgICAgIG91dGRpcjogcGF0aC5qb2luKHJlcG9EaXIsICdjZGsub3V0JyksXG4gICAgICBjb250ZXh0OiB7XG4gICAgICAgICdAYXdzLWNkay9jb3JlOm5ld1N0eWxlU3RhY2tTeW50aGVzaXMnOiAnMScsXG4gICAgICB9LFxuICAgICAgc3RhY2tUcmFjZXM6IGZhbHNlLFxuICAgICAgYXV0b1N5bnRoOiBmYWxzZSxcbiAgICAgIHRyZWVNZXRhZGF0YTogZmFsc2UsXG4gICAgfSk7XG5cbiAgICBjb25zdCB3b3JrZmxvd3NEaXIgPSBwYXRoLmpvaW4ocmVwb0RpciwgJy5naXRodWIvd29ya2Zsb3dzJyk7XG4gICAgZnMubWtkaXJTeW5jKHdvcmtmbG93c0RpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG5cbiAgICBjb25zdCBwaXBlbGluZSA9IG5ldyBHaXRIdWJXb3JrZmxvdyh0aGlzLCAnUGlwZWxpbmUnLCB7XG4gICAgICBzeW50aDogbmV3IFNoZWxsU3RlcCgnQnVpbGQnLCB7XG4gICAgICAgIGNvbW1hbmRzOiBbXG4gICAgICAgICAgJ3lhcm4gaW5zdGFsbCcsXG4gICAgICAgICAgJ3lhcm4gYnVpbGQnLFxuICAgICAgICAgICducHggY2RrIHN5bnRoJyxcbiAgICAgICAgXSxcbiAgICAgICAgcHJpbWFyeU91dHB1dERpcmVjdG9yeTogJ2Nkay5vdXQnLFxuICAgICAgfSksXG4gICAgICB3b3JrZmxvd1BhdGg6IHBhdGguam9pbih3b3JrZmxvd3NEaXIsICdkZXBsb3kueW1sJyksXG4gICAgICBidWlsZENvbnRhaW5lcjogeyBpbWFnZTogJ2FscGluZScgfSxcbiAgICAgIHByZUJ1aWxkU3RlcHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHVzZXM6ICdhY3Rpb25zL3NldHVwLW5vZGVAdjInLFxuICAgICAgICAgIHdpdGg6IHsgbm9kZVZlcnNpb246ICcxNCcgfSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBwb3N0QnVpbGRTdGVwczogW1xuICAgICAgICB7IHJ1bjogJ2VjaG8gcG9zdC1idWlsZCcgfSxcbiAgICAgIF0sXG4gICAgICBkb2NrZXJDcmVkZW50aWFsczogW1xuICAgICAgICBEb2NrZXJDcmVkZW50aWFsLmVjcignNDg5MzE4NzMyMzcxLmRrci5lY3IudXMtZWFzdC0xLmFtYXpvbmF3cy5jb20nKSxcbiAgICAgIF0sXG4gICAgfSk7XG5cbiAgICBjb25zdCBteVN0YWdlID0gbmV3IE15U3RhZ2UodGhpcywgJ1N0YWdlQScsIHsgZW52OiBFbnZpcm9ubWVudFV0aWxzLnBhcnNlKHByb3BzLmVudkEpIH0pO1xuICAgIHBpcGVsaW5lLmFkZFN0YWdlKG15U3RhZ2UsIHtcbiAgICAgIHByZTogW25ldyBTaGVsbFN0ZXAoJ1ByZScsIHtcbiAgICAgICAgY29tbWFuZHM6IFsnZWNobyBoZWxsbyddLFxuICAgICAgfSldLFxuICAgICAgcG9zdDogW25ldyBTaGVsbFN0ZXAoJ1Bvc3QnLCB7XG4gICAgICAgIGVudkZyb21DZm5PdXRwdXRzOiB7XG4gICAgICAgICAgRk5fTkFNRTogbXlTdGFnZS5mbk5hbWUsXG4gICAgICAgIH0sXG4gICAgICAgIGNvbW1hbmRzOiBbJ2VjaG8gRk5fTkFNRSBlcXVhbHM6ICRGTl9OQU1FJ10sXG4gICAgICB9KV0sXG4gICAgfSk7XG5cbiAgICBwaXBlbGluZS5hZGRTdGFnZShuZXcgTXlTdGFnZSh0aGlzLCAnU3RhZ2VCJywgeyBlbnY6IEVudmlyb25tZW50VXRpbHMucGFyc2UocHJvcHMuZW52QikgfSkpO1xuICB9XG59XG5cbmNsYXNzIE15U3RhZ2UgZXh0ZW5kcyBTdGFnZSB7XG4gIHB1YmxpYyByZWFkb25seSBmbk5hbWU6IENmbk91dHB1dDtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IEFwcCwgaWQ6IHN0cmluZywgcHJvcHM6IFN0YWdlUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IGZuU3RhY2sgPSBuZXcgU3RhY2sodGhpcywgJ0Z1bmN0aW9uU3RhY2snKTtcbiAgICBjb25zdCBidWNrZXRTdGFjayA9IG5ldyBTdGFjayh0aGlzLCAnQnVja2V0U3RhY2snKTtcblxuICAgIGNvbnN0IGJ1Y2tldCA9IG5ldyBzMy5CdWNrZXQoYnVja2V0U3RhY2ssICdCdWNrZXQnLCB7XG4gICAgICBhdXRvRGVsZXRlT2JqZWN0czogdHJ1ZSxcbiAgICAgIHJlbW92YWxQb2xpY3k6IFJlbW92YWxQb2xpY3kuREVTVFJPWSxcbiAgICB9KTtcblxuICAgIG5ldyBjb2RlYnVpbGQuUHJvamVjdChmblN0YWNrLCAnTXlQcm9qZWN0Jywge1xuICAgICAgYnVpbGRTcGVjOiBjb2RlYnVpbGQuQnVpbGRTcGVjLmZyb21PYmplY3Qoe1xuICAgICAgICB2ZXJzaW9uOiAnMC4yJyxcbiAgICAgICAgcGhhc2VzOiB7XG4gICAgICAgICAgYnVpbGQ6IHtcbiAgICAgICAgICAgIGNvbW1hbmRzOiBbJ2xzJ10sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAgZ3JhbnRSZXBvcnRHcm91cFBlcm1pc3Npb25zOiBmYWxzZSxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIGJ1aWxkSW1hZ2U6IGNvZGVidWlsZC5MaW51eEJ1aWxkSW1hZ2UuZnJvbUFzc2V0KGZuU3RhY2ssICdNeUltYWdlJywge1xuICAgICAgICAgIGRpcmVjdG9yeTogcGF0aC5qb2luKF9fZGlybmFtZSwgJ2RlbW8taW1hZ2UnKSxcbiAgICAgICAgfSksXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgY29uc3QgZm4gPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKGZuU3RhY2ssICdGdW5jdGlvbicsIHtcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldChwYXRoLmpvaW4oX19kaXJuYW1lLCAnZml4dHVyZXMnKSksXG4gICAgICBoYW5kbGVyOiAnaW5kZXguaGFuZGxlcicsXG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTRfWCxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIEJVQ0tFVF9OQU1FOiBidWNrZXQuYnVja2V0TmFtZSwgLy8gPC0tIGNyb3NzIHN0YWNrIHJlZmVyZW5jZVxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHRoaXMuZm5OYW1lID0gbmV3IENmbk91dHB1dChmblN0YWNrLCAnbXlvdXQnLCB7XG4gICAgICB2YWx1ZTogZm4uZnVuY3Rpb25OYW1lLFxuICAgIH0pO1xuXG4gICAgYnVja2V0LmdyYW50UmVhZChmbik7XG4gIH1cbn0iXX0=