# ADR: 4단계 파이프라인 아키텍처

**상태**: verified

## 맥락

Antigravity 세션의 토큰 사용량을 수집, 분석, 표시하는 VS Code 익스텐션을 설계해야 합니다.
데이터 소스(RPC, 파일시스템)가 다양하고, 다중 인스턴스 환경에서 동작해야 합니다.

## 결정

4단계 파이프라인으로 관심사를 분리합니다:

1. **Data Acquisition** (`rpc/`): 프로세스 탐지 → RPC 통신 → JSONL 직렬화
2. **Data Analysis** (`parser/`, `monitor/`): 세션 스캔 → 소스 결정 → 토큰 파싱 → 비용 산정
3. **Orchestration** (`monitor/tokenMonitorService.ts`): 타이머, 락, 이벤트, 상태 집계
4. **Presentation** (`statusBar/`, `webview/`): StatusBar + Svelte 대시보드

## 대안

- **단일 서비스**: 모든 로직을 한 클래스에 — 테스트 어려움, 모듈 교체 불가.
- **이벤트 기반 마이크로서비스**: 과도한 복잡성.

## 결과

- 각 레이어를 독립적으로 테스트 가능 (DI 패턴 적용).
- 데이터 소스 추가(예: 새 RPC 엔드포인트)가 Acquisition 레이어만 변경.
- Orchestration이 유일한 "알고 있는" 레이어 — 나머지는 서로를 모름.
