set -ex
npx cdk-assets --path "cdk.out/assembly-StageA/StageAFunctionStackD42C27B8.assets.json" --verbose publish "10032de50d9f4f789808bd607d6cb9db2bba396b20fdf23ddede3aed6fbe266e:489318732371-us-east-1"
echo 'asset-hash=10032de50d9f4f789808bd607d6cb9db2bba396b20fdf23ddede3aed6fbe266e' >> $GITHUB_OUTPUT