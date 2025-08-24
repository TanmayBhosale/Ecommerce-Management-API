# Ecommerce Management API

This is a simple api which can be used by a Ecommerce stores. It has the following roles:

- `Admin`
- `User`

This API has the following functionalities

- `Admin Responsibilities`:
   - Add new products to the system
   - View existing products
   - Remove products from the system
   - Update details (e.g., name, price) of existing products
   - Manage inventory levels of products

- `User Responsibilities`:
   - View the list of available products
   - Ability to add multiple products in a single order


## Steps to setup and run the project locally

1\) &nbsp; Clone the repo locally:

```shell
git clone https://github.com/TanmayBhosale/qp-assessment.git
```

2\) &nbsp; Install dependencies:

```shell
npm i
```

```shell
npm i -D
```

3\) &nbsp; Create .env file and add the following valiables

```env
DATABASE_URL=
TOKEN_SECRET=
```

Create a database in any relational DB system locally (postgreSQL prefered) and copy the DB URL and paste it against `DATABASE_URL`.

`TOKEN_SECRET` can be anything. It is used for generating auth tokens.

4\) &nbsp; Run migrations and db setup

```shell
npm run setup
```

5\) &nbsp; Run the server
```shell
npm run dev
```


## Create User
- URL: `/user/create`
- Method: `POST`
- Permission: `Open`

**Headers:**
```json
None
```

**Body:**
```json
{
    "name": string,
    "email": string,
    "role": "User" | "Admin",
    "password": "admin"
}
```
**Response**

Code: `201`
```json
{
    "msg": "user created",
    "data": {
        "id": "40683e92-e574-4393-b99b-9970bd57bd4b",
        "name": "Tanmay",
        "email": "tanmaybhosale1234@gmail.com",
        "password": "admin",
        "role": {
            "id": "7ddf5794-df3c-4fe4-a882-268937f700d1",
            "name": "Admin"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQwNjgzZTkyLWU1NzQtNDM5My1iOTliLTk5NzBiZDU3YmQ0YiIsIm5hbWUiOiJUYW5tYXkiLCJlbWFpbCI6InRhbm1heWJob3NhbGUyNGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiYWRtaW4iLCJyb2xlIjp7ImlkIjoiN2RkZjU3OTQtZGYzYy00ZmU0LWE4ODItMjY4OTM3ZjcwMGQxIiwibmFtZSI6IkFkbWluIn0sImlhdCI6MTcwOTkyMTg2N30.GG_nJ8L8Ze7IixnCcAm6cZaz56EmipssgANm6RAG88Y"
    }
}
```

## User Login
- URL: `/user/login`
- Method: `POST`
- Permission: `Open`

**Headers:**
```json
None
```

**Body:**
```json
{
    "name": string,
    "password": string
}
```
**Response**

Code: `200`
```json
{
    "msg": "loggedin",
    "data": {
        "id": "a88eebf7-5a99-42f0-93bd-53d4fde10a8b",
        "name": "Tanmay",
        "email": "tanmaybhosale1234@gmail.com",
        "password": "admin",
        "role": {
            "id": "0fdba05c-50c7-43a8-a13d-25728ec9d7a3",
            "name": "User"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE4OGVlYmY3LTVhOTktNDJmMC05M2JkLTUzZDRmZGUxMGE4YiIsIm5hbWUiOiJUYW5tYXkiLCJlbWFpbCI6InRhbm1heWJob3NhbGUzMDAwQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiYWRtaW4iLCJyb2xlIjp7ImlkIjoiMGZkYmEwNWMtNTBjNy00M2E4LWExM2QtMjU3MjhlYzlkN2EzIiwibmFtZSI6IlVzZXIifSwiaWF0IjoxNzA5OTIyMTgxfQ.Y6imauPiQs8gKz4YNKB1VOhdGb1NyZvETmMb3INkqmA"
    }
}
```

## Create Item
- URL: `/items/create`
- Method: `POST`
- Permission: `Admin`

**Headers:**
```json
    {
        "Authorization": string
    }
```

**Body:**
```json
{
    "name":string,
    "quantity": number,
    "price": number
}
```
**Response**

Code: `201`
```json
{
    "msg": "Item created",
    "data": {
        "id": "45fb8198-e8e0-4112-af87-44f77848be48",
        "name": "Milk",
        "quantity": 50,
        "price": 50
    }
}
```

## Get all items
- URL: `/items`
- Method: `GET`
- Permission: `Admin` `User`

**Headers:**
```json
    {
        "Authorization": string
    }
```

**Body:**
```json
```
**Response**

Code: `200`
```json
{
    "msg": "Ok",
    "data": [
        {
            "id": "45fb8198-e8e0-4112-af87-44f77848be48",
            "name": "Milk",
            "quantity": 50,
            "price": 50
        }
    ]
}
```

## Update Items
- URL: `/items/update`
- Method: `POST`
- Permission: `Admin`

**Headers:**
```json
    {
        "Authorization": string
    }
```

**Body:**
```json
{
    "items": [
        {
            "id": string,
            "quantity": number
        },{
            "id": string,
            "quantity": number
        }
    ]
}
```
**Response**

Code: `200`
```json
{
    "msg": "ok",
    "data": [
        {
            "id": "45fb8198-e8e0-4112-af87-44f77848be48",
            "name": "Milk",
            "quantity": 100,
            "price": 50
        },
        {
            "id": "7210e690-a66f-48de-b555-1e96bc8ac8f7",
            "name": "Bread",
            "quantity": 50,
            "price": 25
        }
    ]
}
```

## Delete Items
- URL: `/items/delete`
- Method: `POST`
- Permission: `Admin`

**Headers:**
```json
    {
        "Authorization": string
    }
```

**Body:**
```json
{
    "ids": string[]
}
```
**Response**

Code: `204`
```json
```

## Place Order
- URL: `/orders/place`
- Method: `POST`
- Permission: `User` `Admin`

**Headers:**
```json
    {
        "Authorization": string
    }
```

**Body:**
```json
{
    "orderItems": [{
        "id": string,
        "quantity": number
    }]
}
```
**Response**

Code: `204`
```json
{
    "msg": "Ok",
    "data": {
        "id": "dc34a982-8ce7-41ba-bda1-e3f65f6ae96f",
        "userId": "a88eebf7-5a99-42f0-93bd-53d4fde10a8b",
        "dateTime": "2024-03-08T18:41:44.834Z"
    }
}
```

## Get Orders
- URL: `/orders`
- Method: `GET`
- Permission: `User` `Admin`

**Headers:**
```json
    {
        "Authorization": string
    }
```

**Body:**
```json
```
**Response**

Code: `204`
```json
{
    "msg": "Ok",
    "data": [
        {
            "id": "dc34a982-8ce7-41ba-bda1-e3f65f6ae96f",
            "userId": "a88eebf7-5a99-42f0-93bd-53d4fde10a8b",
            "dateTime": "2024-03-08T18:41:44.834Z",
            "orderItems": [
                {
                    "id": "eb748808-754a-4262-a57a-8d33dae9be45",
                    "orderId": "dc34a982-8ce7-41ba-bda1-e3f65f6ae96f",
                    "price": 50,
                    "itemId": "45fb8198-e8e0-4112-af87-44f77848be48",
                    "quentity": 2
                }
            ]
        }
    ]
}
```
