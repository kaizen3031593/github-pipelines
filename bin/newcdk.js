"use strict";
// This is a CDK app that uses CDK Pipelines with a GitHub workflows backend. It
// is intended to be executed from the root directory of a GitHub repository and
// it will synthesize a `cdk.out` and `.github/workflows` directory, both of which
// are exepected to be committed into the repository.
//
// To run:
//
//    cdk synth -a "ts-node manual-test.ts"
//
Object.defineProperty(exports, "__esModule", { value: true });
const workflow_app_1 = require("../lib/workflow-app");
const account = process.env.CDK_DEFAULT_ACCOUNT;
if (!account) {
    throw new Error('CDK_DEFAULT_ACCOUNT is required');
}
const app = new workflow_app_1.GitHubExampleApp({
    repoDir: '.',
    envA: `aws://${account}/us-east-1`,
    envB: `aws://${account}/eu-west-1`,
});
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3Y2RrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmV3Y2RrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxnRkFBZ0Y7QUFDaEYsZ0ZBQWdGO0FBQ2hGLGtGQUFrRjtBQUNsRixxREFBcUQ7QUFDckQsRUFBRTtBQUNGLFVBQVU7QUFDVixFQUFFO0FBQ0YsMkNBQTJDO0FBQzNDLEVBQUU7O0FBRUYsc0RBQXVEO0FBRXZELE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUM7QUFDaEQsSUFBSSxDQUFDLE9BQU8sRUFBRTtJQUNaLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztDQUNwRDtBQUVELE1BQU0sR0FBRyxHQUFHLElBQUksK0JBQWdCLENBQUM7SUFDL0IsT0FBTyxFQUFFLEdBQUc7SUFDWixJQUFJLEVBQUUsU0FBUyxPQUFPLFlBQVk7SUFDbEMsSUFBSSxFQUFFLFNBQVMsT0FBTyxZQUFZO0NBQ25DLENBQUMsQ0FBQztBQUVILEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgaXMgYSBDREsgYXBwIHRoYXQgdXNlcyBDREsgUGlwZWxpbmVzIHdpdGggYSBHaXRIdWIgd29ya2Zsb3dzIGJhY2tlbmQuIEl0XG4vLyBpcyBpbnRlbmRlZCB0byBiZSBleGVjdXRlZCBmcm9tIHRoZSByb290IGRpcmVjdG9yeSBvZiBhIEdpdEh1YiByZXBvc2l0b3J5IGFuZFxuLy8gaXQgd2lsbCBzeW50aGVzaXplIGEgYGNkay5vdXRgIGFuZCBgLmdpdGh1Yi93b3JrZmxvd3NgIGRpcmVjdG9yeSwgYm90aCBvZiB3aGljaFxuLy8gYXJlIGV4ZXBlY3RlZCB0byBiZSBjb21taXR0ZWQgaW50byB0aGUgcmVwb3NpdG9yeS5cbi8vXG4vLyBUbyBydW46XG4vL1xuLy8gICAgY2RrIHN5bnRoIC1hIFwidHMtbm9kZSBtYW51YWwtdGVzdC50c1wiXG4vL1xuXG5pbXBvcnQgeyBHaXRIdWJFeGFtcGxlQXBwIH0gZnJvbSAnLi4vbGliL3dvcmtmbG93LWFwcCc7XG5cbmNvbnN0IGFjY291bnQgPSBwcm9jZXNzLmVudi5DREtfREVGQVVMVF9BQ0NPVU5UO1xuaWYgKCFhY2NvdW50KSB7XG4gIHRocm93IG5ldyBFcnJvcignQ0RLX0RFRkFVTFRfQUNDT1VOVCBpcyByZXF1aXJlZCcpO1xufVxuXG5jb25zdCBhcHAgPSBuZXcgR2l0SHViRXhhbXBsZUFwcCh7XG4gIHJlcG9EaXI6ICcuJyxcbiAgZW52QTogYGF3czovLyR7YWNjb3VudH0vdXMtZWFzdC0xYCxcbiAgZW52QjogYGF3czovLyR7YWNjb3VudH0vZXUtd2VzdC0xYCxcbn0pO1xuXG5hcHAuc3ludGgoKTtcbiJdfQ==