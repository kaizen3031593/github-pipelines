set -ex
npx cdk-assets --path "cdk.out/assembly-StageA/StageABucketStackEAC67DBE.assets.json" --verbose publish "c813db77a0f749475f1962bfe168eb09792a0468c379674e79a906e0f62b4c2c:489318732371-us-east-1"
echo '::set-output name=asset-hash::c813db77a0f749475f1962bfe168eb09792a0468c379674e79a906e0f62b4c2c'