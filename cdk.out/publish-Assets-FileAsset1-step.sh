set -x
npx cdk-assets --path "cdk.out/assembly-StageA/StageABucketStackEAC67DBE.assets.json" --verbose publish "43c50b5121383d1a98a3b94b5ed566638062eaf235db714bd5c65a94419c7fcf:489318732371-us-east-1"
echo '::set-output name=asset-hash::43c50b5121383d1a98a3b94b5ed566638062eaf235db714bd5c65a94419c7fcf'