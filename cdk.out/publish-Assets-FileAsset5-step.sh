set -x
npx cdk-assets --path "cdk.out/assembly-StageB/StageBBucketStackDF3FFF07.assets.json" --verbose publish "bd666a7ff96df3c3eff5a60fb6785e2194b73cc264efd599ec51fb7625272515:489318732371-eu-west-1"
echo '::set-output name=hash::bd666a7ff96df3c3eff5a60fb6785e2194b73cc264efd599ec51fb7625272515'