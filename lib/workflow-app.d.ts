import { App } from 'aws-cdk-lib';
export interface GitHubExampleAppProps {
    /**
     * The root directory of the repository.
     *
     * A `cdk.out` directory and `.github/workflows/deploy.yml` file will be
     * synthesied into this directory.
     */
    readonly repoDir: string;
    /**
     * AWS Environment for stage A.
     *
     * Environment must be bootstrapped with `CDK_NEW_BOOTSTRAP=1`.
     *
     * @example aws://111111111111/us-east-1
     */
    readonly envA: string;
    /**
     * AWS environment for stage B.
     *
     * Environment must be bootstrapped with `CDK_NEW_BOOTSTRAP=1`.
     *
     * @example aws://111111111111/us-east-2
     */
    readonly envB: string;
}
/**
 * A CDK app that uses GitHub engine backend for CDK Pipelines.
 *
 * Specify the account
 *
 * You will need to bootstrap (with `CDK_NEW_BOOTSTRAP=1`) two environments
 */
export declare class GitHubExampleApp extends App {
    constructor(props: GitHubExampleAppProps);
}
