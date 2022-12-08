set -ex
npx cdk-assets --path "cdk.out/assembly-StageA/StageABucketStackEAC67DBE.assets.json" --verbose publish "3f51abb709b8e65167a45aeed02bab11540603d909005d7148230ba5ce6c74d7:489318732371-us-east-1"
npx cdk-assets --path "cdk.out/assembly-StageB/StageBBucketStackDF3FFF07.assets.json" --verbose publish "3f51abb709b8e65167a45aeed02bab11540603d909005d7148230ba5ce6c74d7:489318732371-eu-west-1"
echo '::set-output name=asset-hash::3f51abb709b8e65167a45aeed02bab11540603d909005d7148230ba5ce6c74d7'