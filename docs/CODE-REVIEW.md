# Code Review Standards

## 리뷰 체크리스트

### 필수 (모든 PR)

- [ ] 타입 체크 통과: `npm run typecheck` + `npm run typecheck:webview`
- [ ] 기존 테스트 통과: `npm run test:webview`
- [ ] 의존 방향 준수 (Types → Storage → Acquisition → Analysis → Orchestration → Presentation)
- [ ] `vscode` 모듈 import가 Extension 코드(`src/webview/` 외부)에만 있는지 확인
- [ ] 새로운 설정 항목 추가 시 `package.json` `contributes.configuration`과 `config.ts`에 모두 반영

### 보안 관련

- [ ] 외부 네트워크 요청 추가 없음 (또는 명시적 승인)
- [ ] CSRF 토큰이 로그에 노출되지 않음
- [ ] `rejectUnauthorized: false`가 `127.0.0.1` 외부에 사용되지 않음

### Webview 관련

- [ ] Extension ↔ Webview 메시지 타입이 `types.ts`에 정의됨
- [ ] Svelte 컴포넌트가 `vscode` 모듈을 직접 import하지 않음
- [ ] CSP (Content Security Policy) 변경 시 보안 리뷰

## 심각도 레벨

| 레벨 | 의미 | 대응 |
|------|------|------|
| **Blocker** | 빌드 실패, 데이터 손상, 보안 취약점 | 반드시 수정 후 머지 |
| **Major** | 의존 방향 위반, 미처리 에러, 성능 저하 | 머지 전 수정 권장 |
| **Minor** | 코드 스타일, 네이밍, 경미한 개선 | 다음 PR에서 수정 가능 |
| **Nit** | 주관적 선호, 제안 | 선택 사항 |

## 도메인별 추가 확인

| 도메인 | 추가 확인 사항 |
|--------|---------------|
| `rpc/` | RPC 실패 시 graceful fallback 구현, 연결 에러 시 `resetConnection()` 호출 |
| `parser/` | 모델 플레이스홀더 해석 로직, estimated 모드 fallback 동작 |
| `monitor/` | `PollLock` 동작, 다중 인스턴스 시나리오 고려 |
| `pricing/` | 모델 매칭 실패 시 `unpriced` 상태 처리 |
| `webview/` | 반응형 레이아웃, 빈 데이터 상태 처리 |

## 사람 리뷰 필요 시점

- 새로운 RPC 엔드포인트 호출 추가
- `processLocator.ts` 변경 (OS별 분기)
- 외부 네트워크 요청 추가 또는 변경
- `exportStepsJsonl` 관련 변경 (민감 데이터)
- 스토리지 스키마 변경 (`manifest.json`, `monitor-state.json`)
