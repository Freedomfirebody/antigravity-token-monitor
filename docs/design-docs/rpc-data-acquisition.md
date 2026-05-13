# ADR: RPC 기반 데이터 수집 및 히스토리 복구

**상태**: verified

## 맥락

Antigravity `language_server` 프로세스는 내부 HTTPS RPC 서버를 제공합니다.
이 RPC를 통해 정확한 토큰 사용량을 얻을 수 있지만, 비공식 API이며 항상 가용하지 않습니다.

## 결정

### 프로세스 탐지

- `ps -ww -eo pid,ppid,args`로 `language_server` 프로세스를 찾고 `--csrf_token`, `--extension_server_port` 인수를 파싱합니다.
- `lsof`로 리스닝 포트를 확인하고, Heartbeat RPC로 포트를 검증합니다.

### 데이터 수집 전략

1. **활성 세션**: `GetAllCascadeTrajectories`로 목록을 가져온 후 `GetCascadeTrajectoryGeneratorMetadata`로 메타데이터 수집.
2. **히스토리 세션 복구 (Fallback)**: RPC 활성 목록에 없지만 파일시스템에 존재하는 세션은, 세션 ID로 직접 RPC 조회를 시도하여 과거 데이터를 복구.

### 연결 에러 복구

- 연결 에러 시 `resetConnection()`으로 캐시된 포트/토큰을 초기화하여 다음 요청에서 재탐지.

### Graceful Fallback

- RPC 불가 시 파일시스템 기반 추정(`text.length / 4`)으로 전환.
- 세션의 `mode` 필드(`reported` vs `estimated`)로 데이터 정확도를 명시.

## 결과

- 익스텐션 실행 이전에 생성된 과거 세션도 복구 가능.
- RPC 서버가 불가용해도 기본적인 모니터링 기능은 유지.
- `responseModel` 필드 우선, 없을 때 `modelAliases` 폴백으로 모델명 해석.
