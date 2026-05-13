# Quality Score

도메인/레이어별 품질 등급을 추적합니다.

## 등급 기준

| 등급 | 의미 |
|------|------|
| A | 프로덕션 준비 완료 — 테스트, 타입, 문서 충분 |
| B | 양호 — 일부 개선 필요 |
| C | 기능 동작 — 테스트/문서 부족 |
| D | 주의 필요 — 알려진 결함 또는 대규모 리팩터링 필요 |

## 현재 등급 (2026-05-12)

| 도메인 | 등급 | 근거 | 개선 방향 |
|--------|------|------|-----------|
| **Types / Config** | A | 완전한 타입 정의, `strict: true`, 설정 유효성 검증 | - |
| **RPC (Data Acquisition)** | B | 핵심 로직 견고, `trajectoryExporter` 테스트 존재. `processLocator`/`rpcClient` 테스트 부재 | Mock 기반 단위 테스트 추가 |
| **Monitor (Orchestration)** | A | `tokenMonitorService` 테스트 존재 (15KB), 락 메커니즘 구현 | - |
| **Parser** | B | 테스트 존재하나 edge case 커버리지 확인 필요 | estimated 모드 정확도 개선 |
| **Pricing** | A | 테스트 존재, 모델 매칭 폴백 구현 | - |
| **Storage** | A | `snapshotStore` 테스트 존재 (11KB), clearAll 구현 | - |
| **StatusBar** | A | 프레젠테이션 테스트 존재, 관심사 분리 | - |
| **Webview (Svelte)** | B | `App.test.ts` 존재, 컴포넌트 테스트 부족. 미사용 컴포넌트 2개 | 컴포넌트별 테스트 추가, 미사용 정리 |
| **Build** | A | esbuild 듀얼 빌드, watch 모드, VSIX 패키징 | - |
| **Documentation** | A | `docs/architecture.md` 356줄 상세, `ISSUES.md` 존재 | - |

## 종합

- **전체 등급**: **A-**
- **주요 갭**: RPC 레이어 테스트 커버리지, Webview 컴포넌트 테스트
- **강점**: 타입 안전성, 방어적 파싱, 다중 인스턴스 안전성, 상세 아키텍처 문서
