# Welcome to ckBTC-PaymentConnector!

Hello There! ✌🏽

## Run Locally

#### Docker installation

At first rename the `.env-example` to `.env`, then:

Build the image:
```bash
  npm run docker:build
```
Start all services:
```bash
  npm run docker:up
```

or

#### Manual installation

```bash
  npm i
```

We have to create a mysql container, if you want to use another instance, just change the variables in the `.env` file.

```bash
  npm run docker:up:db
```

```bash
  npm run start:dev
```
## API Reference
We have two kinds of endpoints here `public` and `private`.

More details in: Postman Collection

## Used By

This project is used by the following companies:

- Company 1
- Company 2

