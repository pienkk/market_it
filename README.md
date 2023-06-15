## 마켓잇 API 과제

### 사용기술

- TypeScript
- Nest.js
- PostgreSQL
- TypeORM

### 작업 내용

- User, Product, Order 3개의 관계 테이블 생성
- 주문관리 API 개발
- 유닛테스트
- Postman API Document 첨부

### API

- 주문 접수처리
- 주문 완료처리
- 단일 주문조회
- 주문 목록조회

### 실행 방법

1. 저장소를 클론 받고 .env.sample 파일을 참조하여 환경에 맞는 .env 파일작성

```bash
$ git clone https://github.com/pienkk/market_it.git
```

2. RDS에 .env에 작성한 DB가 없을시 생성 mysql을 사용했을 경우 `src > config > database > database.service.ts`에서 type을 'mysql'로 변경

3. 패키지 설치

```bash
$ npm install
```

4. 서버 실행

```bash
$ npm run start
```

#### 테스트 실행

```bash
$ npm run test
```


### 테스트

유닛테스트 완료
<img width="366" alt="KakaoTalk_Photo_2023-06-15-14-55-47" src="https://github.com/pienkk/market_it/assets/104005339/93937757-94a5-41a9-a54c-132777e1a000">


### API Document

1. Postman 다운로드 및 접속 (https://www.postman.com)

2. WorkSpace 생성

3. 좌측 상단 import 클릭 후 마켓잇 테스트 postman 파일 붙여넣기
