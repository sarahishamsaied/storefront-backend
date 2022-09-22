# Udacity Storefront Backend

Upcoming simple online store using Typescript & PostgreSql.

## Tools & Dependencies

- Typescript
- Express
- Prettier
- EsLint
- PostgresSql
- cors
- bcrypt
- jsonwebtoken
- db-migrate
- jasmine

# API Documentation

## Ports

    1 - Server runs on port 3000

    2 - Database runs on port 5432

## Installation

1 - Install all dependencies

    npm i

2 - Run all tests

    npm run test

3 - Run prettier

    npm run prettier

4 - Run eslint

    npm run lint

## Users

1 - **_Authentication Endpoints_**

> - [Show Info](#sign-in-json-format) : POST `/api/auth/signin`

> - [Show Info](#sign-up-json-format) : POST `/api/auth/signup`

2 - **_No Authentication Endpoints_**

> - [Show Info](#get-users-response-json-format) : GET `/api/users`

> - [Show Info](#get-user-response-json-format) : GET `/api/user/:id`

> - [Show Info](#delete-user-response-json-format) : DELETE `/api/user/:id`

## Products

> - [Show Info](#get-products-response-json-format) : GET `/api/products`

> - [Show Info](#get-product-response-json-format) : GET `/api/product/:id`

> - [Show Info](#delete-product-response-json-format) : DELETE `/api/product/:id`

> - [Show Info](#add-product-json-format) : POST `/api/product`

## Orders

> - [Show Info](#get-orders-response-json-format) : GET `/api/orders`

> - [Show Info](#get-order-response-json-format) : GET `/api/order/:id`

> - [Show Info](#add-order-json-format) : POST `/api/order`

# Database Creation

    > `CREATE DATABASE online_store `

    > `CREATE DATABASE online_store_test `

    > `CREATE USER online_store_user WITH PASSWORD 'password123' `

    > `\c online_store`

    > `GRANT ALL PRIVELEGES ON DATABASE online_store TO online_store_user`

    > `\c online_store_test`

    > `GRANT ALL PRIVELEGES ON DATABASE online_store_test TO online_store_user`

# Database Schemas

## users

| Column        | Type                         |
| ------------- | ---------------------------- |
| id            | integer (SERIAL PRIMARY KEY) |
| user_email    | VARCHAR(200)                 |
| user_password | VARCHAR(1000)                |
| firstname     | VARCHAR(100)                 |
| lastname      | VARCHAR(200)                 |

---

## products

| Column      | Type                         |
| ----------- | ---------------------------- |
| id          | integer (SERIAL PRIMARY KEY) |
| productname | VARCHAR(500)                 |
| category    | VARCHAR(300)                 |
| price       | FLOAT                        |

## orders

| Column  | Type                         |
| ------- | ---------------------------- |
| id      | integer (SERIAL PRIMARY KEY) |
| user_id | bigint (FOREIGN KEY)         |
| status  | Status ENUM                  |

## order_product

| Column     | Type                         |
| ---------- | ---------------------------- |
| id         | integer (SERIAL PRIMARY KEY) |
| product_id | bigint (FOREIGN KEY)         |
| order_id   | bigint (FOREIGN KEY)         |
| quantity   | integer                      |

---

# .env File

    PORT = 3000
    POSTGRES_HOST = "127.0.0.1"
    POSTGRES_DB = "online_store"
    POSTGRES_DB_TEST = "online_store_test"
    POSTGRES_USER = "postgres"
    POSTGRES_PORT = 5432
    POSTGRES_PASSWORD = "admin"
    BCRYPT_PASSWORD = "SECRETPASSWORD"
    SALT_ROUNDS = 10
    TOKEN_SECRET = "SECRETTOKEN"
    ENV = "DEV"
