# ADR: Node + Browser 듀얼 빌드 타겟

**상태**: verified

## 맥락

VS Code 익스텐션은 Node.js 런타임에서 실행되지만, Webview UI는 브라우저 샌드박스에서 실행됩니다.
두 환경의 API 접근성이 다릅니다 (Node: `fs`, `child_process`, `vscode` API / Browser: DOM, Web API).

## 결정

esbuild로 두 개의 독립 빌드를 생성합니다:

| 빌드 | 진입점 | 플랫폼 | 포맷 | 타겟 |
|------|--------|--------|------|------|
| Extension | `src/extension.ts` | `node` | `cjs` | `node18` |
| Webview | `src/webview/main.ts` | `browser` | `iife` | `es2020` |

Svelte 컴포넌트는 `esbuild-svelte` 플러그인으로 컴파일 (`css: 'injected'`).

## 결과

- `vscode` 모듈은 Extension 빌드에서만 `external`로 처리.
- Webview는 `postMessage`로만 Extension과 통신 — 타입 안전한 메시지 인터페이스 (`WebviewToExtensionMessage`, `ExtensionToWebviewMessage`).
- 타입 체크도 분리: `tsc --noEmit` (Extension) + `svelte-check` (Webview).
