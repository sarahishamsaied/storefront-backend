# Storefront Backend

Upcoming online store using Typescript & PostgreSql.


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

## Users
1 - ***Authentication Endpoints***

[Show Info](#sign-in-json-format) : POST `/api/auth/signin`  

[Show Info](#sign-up-json-format) : POST `/api/auth/signup`


2 - ***No Authentication Endpoints***

[Show Info](#get-users-response-json-format) : GET `/api/users`

[Show Info](#update-user-json-format) : PATCH `/api/users/:id`

[Show Info](#delete-user-response-json-format) : DELETE `/api/users/:id`

## Products

[Show Info](#get-products-response-json-format) : GET `/api/products`

[Show Info](#get-products-response-json-format) : GET `/api/products/id`

[Show Info](#update-product-json-format) : PATCH `/api/product/:id`

[Show Info](#delete-product-response-json-format) : DELETE `/api/product/:id`

[Show Info](#add-product-json-format) : POST `/api/product/`


### Sign In JSON Format

    {
    user_email:"test@gmail.com",
    user_password:"test"
    }

### Sign Up JSON Format

    {
    firstname:"test",
    lastname:"test",
    user_email:"test@gmail.com",
    user_password:"test"
    }



### GET Users Response JSON Format

    {
        "status": 200,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VycyI6W3siaWQiOjEsImZpcnN0bmFtZSI6InNhcmFoIiwibGFzdG5hbWUiOiJoaXNoYW0iLCJ1c2VyX2VtYWlsIjoic2FyYWhpc2hhbUBnbWFpbC5jb20iLCJ1c2VyX3Bhc3N3b3JkIjoiU2FyYTY1NDMyMSJ9LHsiaWQiOjIsImZpcnN0bmFtZSI6InNhcmFoIiwibGFzdG5hbWUiOiJoaXNoYW0iLCJ1c2VyX2VtYWlsIjoic2FyYWhpc2hhbTJAZ21haWwuY29tIiwidXNlcl9wYXNzd29yZCI6IlNhcmE2NTQzMjEifSx7ImlkIjozLCJmaXJzdG5hbWUiOiJzYXJhaCIsImxhc3RuYW1lIjoiaGlzaGFtIiwidXNlcl9lbWFpbCI6InNhcmFoaXNoYW0zQGdtYWlsLmNvbSIsInVzZXJfcGFzc3dvcmQiOiIkMmIkMTAkaWJoRFBoblpVZWpmbWJ6MEIzTzRKdUUzQTRMd3NvQ1ZvdEV0N2toUE1VUjguQUZyN2F1ZmUifSx7ImlkIjo0LCJmaXJzdG5hbWUiOiJzYXJhc2Vlcm8iLCJsYXN0bmFtZSI6Imhpc2hhbSIsInVzZXJfZW1haWwiOiJzYXJhaGlzaGFtNUBnbWFpbC5jb20iLCJ1c2VyX3Bhc3N3b3JkIjoiJDJiJDEwJFpUeC5yOWhLa1dCQTFORFNnSjhERk9sblBFRFJZak8vNEIzQzluR1pVNVMwZFFyZ0JQbEtXIn0seyJpZCI6NSwiZmlyc3RuYW1lIjoic2FyYXNlZXJvIiwibGFzdG5hbWUiOiJoaXNoYW0iLCJ1c2VyX2VtYWlsIjoic2FyYWhpc2hhbTZAZ21haWwuY29tIiwidXNlcl9wYXNzd29yZCI6IiQyYiQxMCROTnRCbVBqZ0NFRk1lZ0FCcU5qVDllTDlCZkVKY3BCZ0pEMEF3T1ZvVUR6clJUWjhsRTJSTyJ9LHsiaWQiOjYsImZpcnN0bmFtZSI6InRlc3QiLCJsYXN0bmFtZSI6InRlc3QiLCJ1c2VyX2VtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJ1c2VyX3Bhc3N3b3JkIjoiJDJiJDEwJHMueTdacGVEUjVUbTNWYXhPQ0JnTGUvMlpvMmhGSVVuTlhVTkpKQmU4OWtoelZnZlhnSi5TIn1dLCJpYXQiOjE2NjI5Mjc4MDB9.NHti24DAhIfGyXKa32XDXhaTWfgTAtTmlyPE5P1IXas"
    }


### Update User JSON Format

    {
    "firstname": "test",
    "lastname": "test",
    "user_email": "updatedemail@gmail.com",
    "user_password": "updatedPassword"
    }
### Delete User Response JSON Format
    
    {
        "status": 200,
        "removed": "success"
    }

### Get User Response JSON Format

    {
        "status": 200,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJzYXJhaCIsImxhc3RuYW1lIjoiaGlzaGFtIiwidXNlcl9lbWFpbCI6InNhcmFoaXNoYW1AZ21haWwuY29tIiwidXNlcl9wYXNzd29yZCI6IlNhcmE2NTQzMjEifSwiaWF0IjoxNjYyOTI4Mzg0fQ.NxnvScykJNKCWo_PhOkiplIW0-KAcM3_rVHWpWt11QM"
    }


# Products

### Get Products Response JSON Format

    {
        "message": "success",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9kdWN0cyI6W3siaWQiOjEsInByb2R1Y3RuYW1lIjoidGVzdDEiLCJwcmljZSI6IjEyIiwiY2F0ZWdvcnkiOiJ0ZXN0In0seyJpZCI6MiwicHJvZHVjdG5hbWUiOiJ0ZXN0MiIsInByaWNlIjoiMTIiLCJjYXRlZ29yeSI6InRlc3QifSx7ImlkIjozLCJwcm9kdWN0bmFtZSI6InRlc3QzIiwicHJpY2UiOiIxMiIsImNhdGVnb3J5IjoidGVzdCJ9XSwiaWF0IjoxNjYyOTI4ODc3fQ.lf9xqfsa3zbwLYokj4rzkr3c8iqgWI8QNnKtRs0Y-v4"
    }

# .env File


    PORT = 3000
    POSTGRES_HOST = "127.0.0.1"
    POSTGRES_DB = "online_store"
    POSTGRES_USER = "postgres"
    POSTGRES_PORT = 5432
    POSTGRES_PASSWORD = "admin"
    BCRYPT_PASSWORD = "SECRETPASSWORD"
    SALT_ROUNDS = 10
    TOKEN_SECRET = "SECRETTOKEN"


