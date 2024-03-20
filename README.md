## Installation

```bash
$ npm install
```

## prisma setting

```bash
$ npx prisma
```

- prisma.schema 에 정의된 테이블모델을 물리 데이터베이스(mysql)에 적용시키기

```bash
$ npx prisma migrate dev --name init
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
