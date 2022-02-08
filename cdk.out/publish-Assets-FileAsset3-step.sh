set -x
npx cdk-assets --path "cdk.out/assembly-StageA/StageAFunctionStackD42C27B8.assets.json" --verbose publish "a7397c78f309a690d44fe874d281c0bb1298d378201debad8ba48de0856282ca:489318732371-us-east-1"
echo '::set-output name=hash::a7397c78f309a690d44fe874d281c0bb1298d378201debad8ba48de0856282ca'