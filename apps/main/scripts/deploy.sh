#!/usr/bin/env bash

set -euo pipefail

readonly package_name="@streaming-tools/main"
readonly script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly dist_dir="$script_dir/../dist"

usage() {
    cat <<'EOF'
사용법: ./scripts/deploy.sh [S3 버킷] [CloudFront distribution ID]

  ./scripts/deploy.sh my-bucket ABCDEFGHIJKLMN

인자를 생략하면 apps/main/.env.deploy의 값을 써. (.env*는 gitignore라 커밋되지 않아)

  MAIN_S3_BUCKET=my-bucket
  MAIN_CLOUDFRONT_DISTRIBUTION_ID=ABCDEFGHIJKLMN
EOF
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
    usage
    exit 0
fi

if [[ $# -gt 2 ]]; then
    echo "인자가 너무 많아." >&2
    usage >&2
    exit 1
fi

# 인자 > .env.deploy 순서로 값을 정한다.
env_file="$script_dir/../.env.deploy"
if [[ -f "$env_file" ]]; then
    set -a
    # shellcheck disable=SC1090
    . "$env_file"
    set +a
fi
bucket="${1:-${MAIN_S3_BUCKET:-}}"
distribution_id="${2:-${MAIN_CLOUDFRONT_DISTRIBUTION_ID:-}}"

if [[ -z "$bucket" || -z "$distribution_id" ]]; then
    echo "S3 버킷과 CloudFront distribution ID가 필요해." >&2
    usage >&2
    exit 1
fi

if ! command -v aws > /dev/null 2>&1; then
    echo "aws cli가 없어. https://docs.aws.amazon.com/cli/ 에서 설치 후 다시 실행해줘." >&2
    exit 1
fi

echo "1/3 build: $package_name"
pnpm --filter "$package_name" build

if [[ ! -f "$dist_dir/index.html" ]]; then
    echo "빌드 결과물에 index.html이 없어: $dist_dir" >&2
    exit 1
fi

echo "2/3 upload: s3://$bucket"
aws s3 sync "$dist_dir" "s3://$bucket" --delete \
    --cache-control "public, max-age=31536000, immutable" \
    --exclude "index.html"
aws s3 cp "$dist_dir/index.html" "s3://$bucket/index.html" \
    --cache-control "no-cache"

echo "3/3 invalidate: $distribution_id"
invalidation_id="$(aws cloudfront create-invalidation \
    --distribution-id "$distribution_id" \
    --paths "/*" \
    --query "Invalidation.Id" \
    --output text)"

echo "배포 완료. 무효화 진행 상태:"
echo "aws cloudfront get-invalidation --id $invalidation_id --distribution-id $distribution_id"
