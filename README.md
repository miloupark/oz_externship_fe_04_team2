# StudyHub StudyGroup

> 온라인 강의와 스터디 문화를 결합한 IT 학습 플랫폼

이 레포지토리는 StudyHub 서비스 중에서도 스터디 그룹 생성 · 조회 · 리뷰 · 기록 · 일정 관리를 담당하는 도메인 구현을 다루고 있습니다.

- 프로젝트 기간: 2025.11.21 ~ 2025.12.26
- [StudyGroup 배포 링크](https://study.ozcoding.site/)

<br>

## 🐥 팀원

| GitHub      | 이름   |
| ----------- | ------ |
| @miloupark  | 박혜빈 |
| @Jay-klmnop | 윤지예 |

<br>

## ✨ 주요 기능

### 스터디 그룹

- 스터디 그룹 생성 및 수정
- 스터디 리뷰 작성/수정
- 스터디 그룹 검색 및 강의 검색

### 스터디 그룹 상세

- 캘린더 기반 스케줄 생성/조회/수정/삭제
- 리더 위임 및 멤버 추방
- 학습 기록 작성 및 AI 요약

### 기타

- 공통 컴포넌트
- 마크다운 에디터
- WebSocket 기반 실시간 채팅
- 스터디 그룹별 채팅방

<br>

## 🎬 화면 데모

| 스터디그룹 조회                                     | 스터디그룹 검색                                        | 스터디그룹 리뷰                                     |
| --------------------------------------------------- | ------------------------------------------------------ | --------------------------------------------------- |
| <img src="./docs/studygrouplist.gif" width="240" /> | <img src="./docs/studygroup-search.gif" width="240" /> | <img src="./docs/studygrouplist.gif" width="240" /> |

| 스터디그룹 생성                                        | 스터디그룹 수정                                      | 마크다운 에디터                                |
| ------------------------------------------------------ | ---------------------------------------------------- | ---------------------------------------------- |
| <img src="./docs/studygroup-create.gif" width="240" /> | <img src="./docs/studygroup-edit.gif" width="240" /> | <img src="./docs/studynote.gif" width="240" /> |

| 스터디그룹 스케줄                                   | 스터디그룹 기록                                | 채팅                                      |
| --------------------------------------------------- | ---------------------------------------------- | ----------------------------------------- |
| <img src="./docs/study-schedule.gif" width="240" /> | <img src="./docs/studynote.gif" width="240" /> | <img src="./docs/chat.gif" width="240" /> |

<br>

## 🛠 기술 스택

### FE

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
<br>
![Zustand](https://img.shields.io/badge/Zustand-181717?style=for-the-badge&logo=redux&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
<br>
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)
![MSW](https://img.shields.io/badge/MSW-FF6A33?style=for-the-badge&logo=mockserviceworker&logoColor=white)

<br>

## 📏 Project Convention

### Git Branch

| 종류        | 설명                | 예시    | 설명        |
| ----------- | ------------------- | ------- | ----------- |
| **main**    | 메인 브랜치         | main    | 그대로 사용 |
| **develop** | 배포 전 개발 브랜치 | develop | 그대로 사용 |

<br>

### Commit Message

| Type         | 설명                                                 |
| ------------ | ---------------------------------------------------- |
| **feat**     | 새로운 기능 추가                                     |
| **fix**      | 버그 수정                                            |
| **style**    | 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우    |
| **refactor** | 리팩토링 (기능 변경 없음)                            |
| **chore**    | 기타 변경사항 (빌드 스크립트 수정, 패키지 매니저 등) |
