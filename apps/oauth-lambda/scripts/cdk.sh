#!/usr/bin/env bash

set -euo pipefail

readonly stack_name="StreamingToolsOAuthLambdaStack"
readonly package_name="@streaming-tools/oauth-lambda"
readonly import_resource_mapping='{"OAuthFunction814F9D6D":{"FunctionName":"streaming-tools-be"}}'

usage() {
    cat <<'EOF'
사용법: ./scripts/cdk.sh <명령>

명령:
  bootstrap  대상 AWS 계정과 리전을 최초 한 번 bootstrap 해.
  synth      CloudFormation 템플릿을 생성하고 검증해.
  diff       배포 예정인 CloudFormation 변경 사항을 보여줘.
  import     기존 streaming-tools-be Lambda를 CDK stack으로 가져와.
  deploy     OAuth Lambda 스택을 배포해.
  local      OAuth Lambda를 로컬 HTTP 서버로 실행해.

로컬 OAuth callback 테스트를 하려면 각 제공자에
http://localhost:<port>/callback/<provider>를 등록해줘. 로컬 포트 기본값은
3001이고 OAUTH_LOCAL_PORT로 변경할 수 있어. OAUTH_APP_ORIGIN 기본값은
http://localhost:5173이야.

예시:
  ./scripts/cdk.sh import
EOF
}

run_cdk() {
    pnpm --filter "$package_name" "$@"
}

case "${1:-}" in
    bootstrap)
        run_cdk cdk:bootstrap
        ;;
    synth)
        run_cdk cdk:synth
        ;;
    diff)
        run_cdk cdk:diff
        ;;
    import)
        pnpm --filter "$package_name" exec cdk import "$stack_name" \
            --resource-mapping-inline "$import_resource_mapping"
        ;;
    deploy)
        run_cdk cdk:deploy
        ;;
    local)
        local_port="${OAUTH_LOCAL_PORT:-3001}"
        export OAUTH_LOCAL_PORT="$local_port"
        export OAUTH_APP_ORIGIN="${OAUTH_APP_ORIGIN:-http://localhost:5173}"
        export OAUTH_PUBLIC_API_BASE_URL="${OAUTH_PUBLIC_API_BASE_URL:-http://localhost:$local_port}"
        export TWITCH_CLIENT_SECRET_PARAMETER="${TWITCH_CLIENT_SECRET_PARAMETER:-/streamingTools/TWITCH_CLIENT_SECRET}"
        export CHZZK_CLIENT_SECRET_PARAMETER="${CHZZK_CLIENT_SECRET_PARAMETER:-/streamingTools/CHZZK_CLIENT_SECRET}"
        export SOOP_CLIENT_SECRET_PARAMETER="${SOOP_CLIENT_SECRET_PARAMETER:-/streamingTools/SOOP_CLIENT_SECRET}"
        run_cdk local
        ;;
    -h | --help | help | "")
        usage
        ;;
    *)
        echo "알 수 없는 명령이야: $1" >&2
        usage >&2
        exit 1
        ;;
esac
