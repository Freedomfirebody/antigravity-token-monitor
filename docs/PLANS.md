# Planning Conventions

## 계획 구조

```
docs/plans/
├── designs/              ← 영구 설계 참조 (Status: Draft | Approved)
│   └── {NNN}-{name}.md
└── work/                 ← 실행 계획 (Status: Active | Completed)
    ├── {NNN}-{name}.md
    └── tech-debt-tracker.md
```

## 파일 명명

- 3자리 0-패딩 순번: `001-feature-name.md`
- 폴더별 독립 순번

## Status 필드

모든 계획 파일은 YAML frontmatter 또는 첫 줄에 `Status` 를 명시합니다:

```markdown
# 001 — Feature Name

**Status**: Active
```

| Status | 의미 |
|--------|------|
| `Draft` | 초안, 검토 중 |
| `Approved` | 승인된 설계 (designs/) |
| `Active` | 진행 중인 작업 (work/) |
| `Completed` | 완료된 작업 |
| `Cancelled` | 취소됨 |

## 계획 작성 템플릿

```markdown
# {NNN} — {제목}

**Status**: {Draft | Active | ...}

## 목표
{달성하려는 것}

## 배경
{왜 이 작업이 필요한지}

## 작업 항목
- [ ] 항목 1
- [ ] 항목 2

## 결정 로그
| 날짜 | 결정 | 이유 |
|------|------|------|

## 완료 기준
{언제 완료로 간주하는지}
```

## 규칙

1. `docs/plans/`는 `.gitignore`에 추가하여 로컬 작업 노트로 유지
2. 영구적으로 보존할 설계는 `docs/design-docs/`에 ADR로 기록
3. 완료된 작업은 `Status: Completed`로 변경하되 삭제하지 않음
