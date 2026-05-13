# Antigravity Token Monitor

> VS Code 익스텐션 — Antigravity 세션 토큰 사용량 자동 수집·분석·시각화

## Architecture

[ARCHITECTURE.md](ARCHITECTURE.md)에서 도메인 맵, 모듈 레이어링, 데이터 흐름을 확인하세요.
상세 구현 문서: [docs/architecture.md](docs/architecture.md)

## Documentation

- [Design Docs](docs/design-docs/index.md) — 아키텍처 결정 및 핵심 원칙
- [Plans](docs/plans/) — 설계 참조 (`designs/`) 및 실행 계획 (`work/`)
- [Product Specs](docs/product-specs/index.md) — 기능 명세
- [References](docs/references/) — 외부 라이브러리 참조 (LLM 최적화)

## Domain Guides

- [Security](docs/SECURITY.md) — 보안 정책, 위협 모델, 데이터 처리
- [Product Sense](docs/PRODUCT-SENSE.md) — 제품 사고, 사용자 멘탈 모델

## Quality & Planning

- [Quality Score](docs/QUALITY-SCORE.md) — 도메인별 품질 등급
- [Code Review](docs/CODE-REVIEW.md) — 리뷰 표준 및 체크리스트
- [Plans](docs/PLANS.md) — 계획 작성 규칙
- [Tech Debt](docs/plans/work/tech-debt-tracker.md) — 기술 부채 추적
- [Known Issues](docs/ISSUES.md) — 알려진 이슈 및 해결 방법

## Project Structure

```
src/
├── extension.ts           # 진입점
├── config.ts / types.ts   # 설정, 공유 타입
├── modelAliases.ts        # 모델 플레이스홀더 해석
├── rpc/                   # 데이터 수집 (프로세스 탐지, RPC, JSONL 직렬화)
├── monitor/               # 오케스트레이션 (스캔, 파싱 위임, 타이머, 락)
├── parser/                # 토큰 파싱 (reported / estimated)
├── pricing/               # LiteLLM 기반 비용 산정
├── storage/               # RPC 아티팩트 + 스냅샷 영속화
├── statusBar/             # VS Code 상태바
└── webview/               # Svelte 5 대시보드 (13개 컴포넌트)
```

## Quick Rules

1. **의존 방향**: Types → Storage → Acquisition → Analysis → Orchestration → Presentation. 역방향 금지.
2. **`vscode` import 제한**: `src/webview/` 내부에서는 `vscode` 모듈을 직접 import하지 않음. `postMessage`로만 통신.
3. **RPC 실패 대비**: 모든 RPC 호출은 실패 시 graceful fallback 필수. `resetConnection()`으로 캐시 초기화 → 재탐지.
4. **데이터 정확도 명시**: 토큰 모드(`reported` vs `estimated`)와 소스(`rpc-artifact` vs `filesystem`)를 항상 표시.
5. **외부 네트워크 제한**: `127.0.0.1` RPC와 LiteLLM 가격표 다운로드만 허용. 새로운 외부 요청 추가 시 보안 리뷰 필수.

## Commands

```bash
npm run compile              # 빌드
npm run watch                # 개발 모드
npm run typecheck            # Extension 타입 체크
npm run typecheck:webview    # Webview 타입 체크
npm run test:webview         # Webview 테스트
npm run package              # VSIX 패키징
```

<!-- MANUAL: Notes below this line are preserved on regeneration -->
