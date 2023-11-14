# Welcome to ckBTC-PaymentConnector!

Hello There! ✌🏽 This project implements transactions in [ckBTC](https://internetcomputer.org/docs/current/developer-docs/integrations/bitcoin/ckbtc), a cryptocurrency based on the Bitcoin blockchain. The goal of this project is to demonstrate how transactions can be implemented in a cryptocurrency in a secure and efficient manner.

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
Install prisma-cli:
```bash
  npm i prisma -g
```

We have to create a mysql container, if you want to use another instance, just change the variables in the `.env` file.

```bash
  npm run docker:up:db
```

Run migrations:
```bash
  npx prisma migrate dev
```

Run seeders:
```bash
  npx prisma db seed
```
And finally:
```bash
  npm run start:dev
```

## API Reference
We have two kinds of endpoints here `public` and `private`.

More details in: [Postman Collection](https://github.com/lastcron/ckbtc-boilerplate/blob/production/docs.postman_collection.json)

### Private endpoints

#### Get Balance

```http
  GET app/user-balance/:uid
```
Get the user balance by ckBTC from network.

#### Get payment status

```http
  GET app/payment-status
```
Get payment status from ckBTC Network.

#### Get payment received

```http
  GET app/payment-received
```
Check if the payment has been received.

#### Get payment history

```http
  GET app/payment-history
```
Retrieve the payment history by user.

#### Create payment request

```http
  POST app/payment-status
```
Create payment request to another ckBTC address.

### Public endpoints

#### Login

```http
  POST /login
```

#### Register

```http
  POST /refresh
```

#### Refresh

```http
  POST /recover
```

#### Recover

```http
  POST /register
```