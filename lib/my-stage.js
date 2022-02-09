"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyStage = void 0;
const lambda = require("aws-cdk-lib/aws-lambda");
const s3 = require("aws-cdk-lib/aws-s3");
const path = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
class MyStage extends aws_cdk_lib_1.Stage {
    constructor(scope, id, props = {}) {
        super(scope, id, props);
        const fnStack = new aws_cdk_lib_1.Stack(this, 'FunctionStack');
        const bucketStack = new aws_cdk_lib_1.Stack(this, 'BucketStack');
        const bucket = new s3.Bucket(bucketStack, 'Bucket', {
            autoDeleteObjects: true,
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
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
                BUCKET_NAME: bucket.bucketName,
            },
        });
        bucket.grantRead(fn);
    }
}
exports.MyStage = MyStage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXktc3RhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJteS1zdGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpREFBaUQ7QUFDakQseUNBQXlDO0FBRXpDLDZCQUE2QjtBQUM3Qiw2Q0FBMkU7QUFFM0UsTUFBYSxPQUFRLFNBQVEsbUJBQUs7SUFDaEMsWUFBWSxLQUFVLEVBQUUsRUFBVSxFQUFFLFFBQW9CLEVBQUU7UUFDeEQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxtQkFBSyxDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQztRQUNqRCxNQUFNLFdBQVcsR0FBRyxJQUFJLG1CQUFLLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBRW5ELE1BQU0sTUFBTSxHQUFHLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsUUFBUSxFQUFFO1lBQ2xELGlCQUFpQixFQUFFLElBQUk7WUFDdkIsYUFBYSxFQUFFLDJCQUFhLENBQUMsT0FBTztTQUNyQyxDQUFDLENBQUM7UUFFSCxnREFBZ0Q7UUFDaEQsZ0RBQWdEO1FBQ2hELHNCQUFzQjtRQUN0QixnQkFBZ0I7UUFDaEIsaUJBQWlCO1FBQ2pCLDRCQUE0QjtRQUM1QixXQUFXO1FBQ1gsU0FBUztRQUNULFFBQVE7UUFDUix3Q0FBd0M7UUFDeEMsbUJBQW1CO1FBQ25CLDRFQUE0RTtRQUM1RSw2REFBNkQ7UUFDN0QsVUFBVTtRQUNWLE9BQU87UUFDUCxNQUFNO1FBRU4sTUFBTSxFQUFFLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUU7WUFDbEQsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztZQUNqRSxPQUFPLEVBQUUsZUFBZTtZQUN4QixPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLFdBQVcsRUFBRTtnQkFDWCxXQUFXLEVBQUUsTUFBTSxDQUFDLFVBQVU7YUFDL0I7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7Q0FDRjtBQXhDRCwwQkF3Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSAnYXdzLWNkay1saWIvYXdzLWxhbWJkYSc7XG5pbXBvcnQgKiBhcyBzMyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtczMnO1xuaW1wb3J0ICogYXMgY29kZWJ1aWxkIGZyb20gJ2F3cy1jZGstbGliL2F3cy1jb2RlYnVpbGQnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IFJlbW92YWxQb2xpY3ksIEFwcCwgU3RhY2ssIFN0YWdlLCBTdGFnZVByb3BzIH0gZnJvbSAnYXdzLWNkay1saWInO1xuXG5leHBvcnQgY2xhc3MgTXlTdGFnZSBleHRlbmRzIFN0YWdlIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IEFwcCwgaWQ6IHN0cmluZywgcHJvcHM6IFN0YWdlUHJvcHMgPSB7fSkge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgY29uc3QgZm5TdGFjayA9IG5ldyBTdGFjayh0aGlzLCAnRnVuY3Rpb25TdGFjaycpO1xuICAgIGNvbnN0IGJ1Y2tldFN0YWNrID0gbmV3IFN0YWNrKHRoaXMsICdCdWNrZXRTdGFjaycpO1xuXG4gICAgY29uc3QgYnVja2V0ID0gbmV3IHMzLkJ1Y2tldChidWNrZXRTdGFjaywgJ0J1Y2tldCcsIHtcbiAgICAgIGF1dG9EZWxldGVPYmplY3RzOiB0cnVlLFxuICAgICAgcmVtb3ZhbFBvbGljeTogUmVtb3ZhbFBvbGljeS5ERVNUUk9ZLFxuICAgIH0pO1xuXG4gICAgLy8gbmV3IGNvZGVidWlsZC5Qcm9qZWN0KGZuU3RhY2ssICdNeVByb2plY3QnLCB7XG4gICAgLy8gICBidWlsZFNwZWM6IGNvZGVidWlsZC5CdWlsZFNwZWMuZnJvbU9iamVjdCh7XG4gICAgLy8gICAgIHZlcnNpb246ICcwLjInLFxuICAgIC8vICAgICBwaGFzZXM6IHtcbiAgICAvLyAgICAgICBidWlsZDoge1xuICAgIC8vICAgICAgICAgY29tbWFuZHM6IFsnbHMnXSxcbiAgICAvLyAgICAgICB9LFxuICAgIC8vICAgICB9LFxuICAgIC8vICAgfSksXG4gICAgLy8gICBncmFudFJlcG9ydEdyb3VwUGVybWlzc2lvbnM6IGZhbHNlLFxuICAgIC8vICAgZW52aXJvbm1lbnQ6IHtcbiAgICAvLyAgICAgYnVpbGRJbWFnZTogY29kZWJ1aWxkLkxpbnV4QnVpbGRJbWFnZS5mcm9tQXNzZXQoZm5TdGFjaywgJ015SW1hZ2UnLCB7XG4gICAgLy8gICAgICAgZGlyZWN0b3J5OiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4nLCAnZGVtby1pbWFnZScpLFxuICAgIC8vICAgICB9KSxcbiAgICAvLyAgIH0sXG4gICAgLy8gfSk7XG5cbiAgICBjb25zdCBmbiA9IG5ldyBsYW1iZGEuRnVuY3Rpb24oZm5TdGFjaywgJ0Z1bmN0aW9uJywge1xuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KHBhdGguam9pbihfX2Rpcm5hbWUsICcuLicsICdsYW1iZGEnKSksXG4gICAgICBoYW5kbGVyOiAnaW5kZXguaGFuZGxlcicsXG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTRfWCxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIEJVQ0tFVF9OQU1FOiBidWNrZXQuYnVja2V0TmFtZSwgLy8gPC0tIGNyb3NzIHN0YWNrIHJlZmVyZW5jZVxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGJ1Y2tldC5ncmFudFJlYWQoZm4pO1xuICB9XG59Il19