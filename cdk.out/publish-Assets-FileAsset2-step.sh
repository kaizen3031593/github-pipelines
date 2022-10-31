set -ex
npx cdk-assets --path "cdk.out/assembly-StageA/StageABucketStackEAC67DBE.assets.json" --verbose publish "6babbac1f25446ab4660ead0ad5972e3a7742f50c6d8326af98a8bcd5d485335:489318732371-us-east-1"
npx cdk-assets --path "cdk.out/assembly-StageB/StageBBucketStackDF3FFF07.assets.json" --verbose publish "6babbac1f25446ab4660ead0ad5972e3a7742f50c6d8326af98a8bcd5d485335:489318732371-eu-west-1"
echo 'asset-hash=6babbac1f25446ab4660ead0ad5972e3a7742f50c6d8326af98a8bcd5d485335' >> $GITHUB_OUTPUT