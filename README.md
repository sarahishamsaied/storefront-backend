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

> - [Show Info](#complete-order-response-json-format) : PATCH `/api/orders/complete/:id`


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

# Sign Up JSON Format
    {
        "user_email":"janedoe@gmail.com",
        "firstname":"jane",
        "lastname":"doe",
        "user_password":"janedoe123"
    }
    
# Sign In JSON Format

    {
    "user_email":"janedoe@gmail.com",
    "user_password":"jane"
    }
    
# GET Users Response JSON Format

    {
        "status": 200,
        "users": [
            {
                "id": 1,
                "firstname": "jane",
                "lastname": "doe",
                "user_email": "janedoe@gmail.com",
                "user_password": "$2b$10$s.y7ZpeDR5Tm3VaxOCBgLe/2Zo2hFIUnNXUNJJBe89khzVgfXgJ.S"
            }
         ]
    }
    
 # GET User Response JSON Format
 
     {
        "status": 200,
        "user": {
            "id": 1,
            "firstname": "sarah",
            "lastname": "hisham",
            "user_email": "sarahisham@gmail.com",
            "user_password": "$2b$10$s.y7ZpeDR5Tm3VaxOCBgLe/2Zo2hFIUnNXUNJJBe89khzVgfXgJ.S"
        }
    }
   
# DELETE User Response JSON Format

    {
        "removed": "success"
    }
# ADD Product JSON Format

    {
        "productname":"Apple Air Pods",
        "price":100,
        "category":"Air Pods"
    }
    
# GET Products Response JSON Format

    {
        "message": "success",
        "products": [
                {
                "id": 1,
                "productname": "Apple Air Pods",
                "price": 100,
                "category": "Air Pods"
                }
        ]
    }
# GET Product Response JSON Format

    {
        "message": "success",
        "product": {
            "id": 1,
               "productname": "Apple Air Pods",
               "price": 100,
              "category": "Air Pods"
        }
    }
    
# DELETE Product Response JSON Format
 
    {
        "message": "success"
    }
    
# ADD Order JSON Format

    {
        "user_id":1,
        "products":[
            {
                "product_id":1,
                "quantity":33
            }
        ]
    }
    
# ADD Order Response JSON Format
    {
        "message": "success",
        "order": {
            "id": 1,
            "user_id": 1,
            "status": "ACTIVE",
            "products": [
                {
                    "product_id": "1",
                    "quantity": 33
                }
            ]
        }
 }
 
 # GET Orders Response JSON Format
 
     {
        "message": "success",
        "orders": [
            {
                "id": 1,
                "user_id": 1,
                "status": "ACTIVE",
                "products": [
                    {
                        "product_id": "1",
                        "quantity": 33
                    }
               ]
          }  
    }
# GET Order Response JSON Format

    {
        "message": "success",
        "order": {
            "id": 1,
            "user_id": 1,
            "status": "ACTIVE",
            "products": [
                {
                    "product_id": "1",
                    "quantity": 33
                }
            ]
        }
    }
    
# COMPLETE Order Response JSON Format

    {
        "message": "success",
        "order": {
            "id": 7,
            "user_id": 1,
            "status": "COMPLETE"
        }
    }

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
