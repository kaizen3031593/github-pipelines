set -x
npx cdk-assets --path "cdk.out/assembly-StageA/StageAFunctionStackD42C27B8.assets.json" --verbose publish "923d41051861c9ea2fa3f60c36c4c5a7f10bdf4fa44ed6965ba3a7bfe50f0487:489318732371-us-east-1"
npx cdk-assets --path "cdk.out/assembly-StageB/StageBFunctionStack18098DCD.assets.json" --verbose publish "923d41051861c9ea2fa3f60c36c4c5a7f10bdf4fa44ed6965ba3a7bfe50f0487:489318732371-eu-west-1"
echo '::set-output name=asset-hash::923d41051861c9ea2fa3f60c36c4c5a7f10bdf4fa44ed6965ba3a7bfe50f0487'