set -x
npx cdk-assets --path "cdk.out/assembly-StageA/StageAFunctionStackD42C27B8.assets.json" --verbose publish "16d571459b27163590e437ed1d4d2ff54cacf3beb9168007c6632736ab932626:489318732371-us-east-1"
echo '::set-output name=asset-hash::16d571459b27163590e437ed1d4d2ff54cacf3beb9168007c6632736ab932626'