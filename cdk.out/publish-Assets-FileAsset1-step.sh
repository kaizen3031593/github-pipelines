set -ex
npx cdk-assets --path "cdk.out/assembly-StageA/StageABucketStackEAC67DBE.assets.json" --verbose publish "5b034bf8343c1f61e3cc150c9a186cd8f8f14e548cd097d360386b92cb69a56f:489318732371-us-east-1"
echo 'asset-hash=5b034bf8343c1f61e3cc150c9a186cd8f8f14e548cd097d360386b92cb69a56f' >> $GITHUB_OUTPUT