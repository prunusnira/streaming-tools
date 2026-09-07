# OAuth Lambda

OAuth callback 기본 URL: `https://api.nira.one/streaming`

## CDK 배포

최초 배포 전 대상 AWS 계정과 리전을 한 번 bootstrap 해줘.

```sh
./scripts/cdk.sh bootstrap
```

기존 `streaming-tools-be` Lambda를 처음 CDK로 관리할 때만 import를 실행해. 현재 프로젝트의 Lambda import는 완료된 상태야.

```sh
./scripts/cdk.sh import
```

import 이후에는 일반 deploy로 코드를 갱신해.

```sh
./scripts/cdk.sh diff
./scripts/cdk.sh deploy
```

CDK는 기존 Lambda 실행 역할 `streaming-tools-be-role-31teuao6`를 그대로 사용해. SSM과 KMS 권한은 이 역할에서 관리해.

API Gateway와 `api.nira.one/streaming` 커스텀 도메인 매핑은 이 스택 밖에서 관리해. 배포 후 API Gateway 통합 대상을 `OAuthFunctionArn` 출력값으로 변경해줘.

Lambda 함수명은 `streaming-tools-be`로 고정돼 있고 스택 삭제 시에도 보존돼.

## 로컬 테스트

Lambda를 로컬 HTTP 서버로 실행해.

```sh
./scripts/cdk.sh local
```

로컬 서버는 기본적으로 `http://localhost:3001`에서 실행돼. 운영 Parameter Store 경로와 현재 shell에 설정된 AWS 자격 증명을 사용해. 필요하면 포트를 변경해.

```sh
OAUTH_LOCAL_PORT=3002 ./scripts/cdk.sh local
```

OAuth callback 전체 흐름을 테스트하려면 각 제공자에 `http://localhost:<port>/callback/<provider>` URL을 등록해줘. 로컬 shell은 프론트 Origin을 기본적으로 `http://localhost:5173`으로 사용해. 다른 포트를 쓴다면 `OAUTH_APP_ORIGIN`으로 덮어쓸 수 있어.
