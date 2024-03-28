## Installation

```bash
$ npm install
```

## prisma setting

- docker-compose에 기재한 mysql, redis 환경 셋팅 (단, Docker 앱 접속먼저 하고 밑의 명령어를 해주세요.)

```bash
$ docker-compose up -d
```

```bash
$ npx prisma
```

- prisma.schema 에 정의된 테이블모델을 물리 데이터베이스(mysql)에 적용시키기

```bash
$ npx prisma migrate dev --name init
```

- Prisma client 생성
  - Prisma 공식자료: [Generating Prisma Client](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/generating-prisma-client)

```bash
$ npx prisma generate
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
