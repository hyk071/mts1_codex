# 무인영상단속카메라 관리 프론트엔드 (Next.js)

내부업무용 웹앱의 프론트엔드만 구성했습니다. 모든 데이터는 클라이언트 상태/모의 JSON으로 관리합니다.

## 기술스택
- Next.js (App Router) + React 18 + TypeScript
- 스타일: TailwindCSS (+ shadcn 스타일 컴포넌트 최소구현)
- 아이콘: lucide-react
- 테이블: @tanstack/react-table
- 엑셀 파서: sheetjs (xlsx)
- 차트: recharts

## 주요 화면
- 대시보드: 카메라/일정/로그 요약 + 상태 분포 차트
- 카메라: 목록/검색, 신규 등록, 엑셀 업로드로 일괄 추가
- 점검일정: 목록/검색, 신규 등록
- 로그 분석: 로컬 엑셀 업로드, 간단 필터 (원격 수집은 추후)

## 로컬 실행
1. 의존성 설치

```bash
pnpm install # 또는 npm install / yarn
```

2. 개발 서버

```bash
pnpm dev
```

3. 빌드/실행

```bash
pnpm build && pnpm start
```

## 경로 별칭
- `@/*` → 프로젝트 루트 기준 임포트

## 참고
- 현재는 백엔드/DB 연동이 없으며, `lib/mock-data.ts` 데이터와 클라이언트 상태로 동작합니다.
- 디자인은 shadcn/ui 스타일을 참고한 최소 구성으로, 필요 시 컴포넌트 추가/교체 가능합니다.
