set -ex
npx cdk-assets --path "cdk.out/assembly-StageB/StageBBucketStackDF3FFF07.assets.json" --verbose publish "eefeb8bcdfdd2b8a4cc9e7d1dcd75410f588085935ad5714544e56fd40652403:489318732371-eu-west-1"
echo '::set-output name=asset-hash::eefeb8bcdfdd2b8a4cc9e7d1dcd75410f588085935ad5714544e56fd40652403'