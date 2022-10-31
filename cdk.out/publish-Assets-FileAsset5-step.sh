set -ex
npx cdk-assets --path "cdk.out/assembly-StageB/StageBBucketStackDF3FFF07.assets.json" --verbose publish "aa45956e291acd3ae74dc9182ce12e6e0d476cc74b6c24ecde9982d25015ebad:489318732371-eu-west-1"
echo '::set-output name=asset-hash::aa45956e291acd3ae74dc9182ce12e6e0d476cc74b6c24ecde9982d25015ebad'