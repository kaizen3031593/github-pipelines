set -x
npx cdk-assets --path "cdk.out/assembly-StageA/StageAFunctionStackD42C27B8.assets.json" --verbose publish "ddce17e2014f82c113eda5dace24564bea5d971bf6ffab77e2e9f2136fbe23fa:489318732371-us-east-1"
echo '::set-output name=hash::ddce17e2014f82c113eda5dace24564bea5d971bf6ffab77e2e9f2136fbe23fa'
npx cdk-assets --path "cdk.out/assembly-StageB/StageBFunctionStack18098DCD.assets.json" --verbose publish "ddce17e2014f82c113eda5dace24564bea5d971bf6ffab77e2e9f2136fbe23fa:489318732371-eu-west-1"
echo '::set-output name=hash::ddce17e2014f82c113eda5dace24564bea5d971bf6ffab77e2e9f2136fbe23fa'