set -ex
npx cdk-assets --path "cdk.out/assembly-StageB/StageBFunctionStack18098DCD.assets.json" --verbose publish "e47137df456c15b84d022a78af099a8b48cbd69412cd7ce86237886752b1655c:489318732371-eu-west-1"
echo 'asset-hash=e47137df456c15b84d022a78af099a8b48cbd69412cd7ce86237886752b1655c' >> $GITHUB_OUTPUT