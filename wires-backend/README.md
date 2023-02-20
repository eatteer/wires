<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

### install pre-requirements

```
docker ✓
node ✓
nestjs ✓
```

## Getting started

install nest-cli

```
npm i -g @nestjs/cli
```

run docker-compose to create database, command from same address

```
docker-compose up -d
```

### Installing dependicies

```
npm i or yarn
```

### Configure .env variables

```bash
$ cp .env.example .env
```

### Env Example

```bash
# Database
DB_HOST
DB_PORT
DB_USERNAME
DB_PASSWORD
DB_DATABASE

# Authentication
JWT_SECRET
JWT_EXPIRES_IN
```

### Running the app

```bash
# development
$ npm run start
or
$ yarn start

# watch mode
$ npm run start:dev
or
$ yarn start:dev

# production mode
$ npm run start:prod
or
$ yarn start:prod
```

# Register

POST wires/auth/signup
Body:

- email: string
- username: string
- password: string
- fullName: string

Return user with your data your id and creation date

```bash
{
  "id": "e207fee6-7542-4311-8646-d12e1fde3baa",
  "username": "example",
  "email": "example@gmail.com",
  "fullname": "exam example"
}
```

# Login

POST wires/auth/signin
Body:

- username: string
- password: string

Return return an access token for the authorization of further requests

```bash
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImV4YW1wbGUiLCJ1c2VySWQiOiJlMjA3ZmVlNi03NTQyLTQzMTEtODY0Ni1kMTJlMWZkZTNiYWEiLCJpYXQiOjE2NzMzNjE5ODMsImV4cCI6MTY3MzQ0ODM4M30.W5h2VzR3UlHSQDNX8ktJmOzoD0fhZyUuD85XrDQpt7g",
    "expires_in": "1d",
    "message": "Successfully logged in",
    "status": true
}
```

# Messages Methods

- Other endpoints will require you to pass the authorization token into the application via an authorization bearer token ✓

# Create Message

POST wires/messages
Body:

- title : string
- text : string

Returns all the data corresponding to the message created.

```bash
{
    "title": "new messages",
    "text": "this is a desc message",
    "user": "5c91874d-e8f2-4119-9a80-8e3d8f23dfee",
    "id": "3",
    "createdAt": "2023-01-10",
    "updatedAt": "2023-01-10T14:56:24.332Z"
}
```

# Get all Messages

GET wires/messages

returns all created messages independent of the user

```bash
{
        "id": "2",
        "title": "tes2t1",
        "text": "this is a messages",
        "createdAt": "2023-01-10",
        "updatedAt": "2023-01-10T12:35:11.177Z",
        "user": {
            "id": "5c91874d-e8f2-4119-9a80-8e3d8f23dfee",
            "username": "example",
            "email": "example@gmail.com",
            "fullname": "exam example",
            "createdAt": "2023-01-10T17:32:45.687Z",
            "updatedAt": "2023-01-10T17:32:45.687Z"
        }
    }
```

# get owner messages

GET wires/messages/me

returns all messages appended to my user id

```bash
[
    {
        "id": "4",
        "title": "examples",
        "text": "example",
        "createdAt": "2023-01-10",
        "updatedAt": "2023-01-10T15:25:10.467Z"
    },
    {
        "id": "5",
        "title": "exampless",
        "text": "examplse",
        "createdAt": "2023-01-10",
        "updatedAt": "2023-01-10T15:26:01.191Z"
    }
]
```

# Get only message by id

GET wires/messages/me/${id}

returns the message found with that id

```bash
{
    "id": "4",
    "title": "examples",
    "text": "example",
    "createdAt": "2023-01-10",
    "updatedAt": "2023-01-10T15:25:10.467Z"
}
```

# Get Filter message

GET wires/messages/find

returns messages found by search filters

Body:
-search : string ? optional
-date : date ? optional

```bash
query:

{
    "search" : "new"
}

result:

[
    {
        "id": "3",
        "title": "new messages",
        "text": "this is a desc message",
        "createdAt": "2023-01-10",
        "updatedAt": "2023-01-10T14:56:24.332Z"
    }
]
```

# Delete a message

DELETE wires/messages/${id}

return raws affected for sql query

```bash
{
    "raw": [],
    "affected": 1
}
```


# Comment message

PATCH wires/messages/comment/${message_id}

Params : id - this is a message id
Body:
    - comment : string

return message with comments

```bash
{
    "id": "2",
    "title": "tes2t1",
    "text": "this is a messages",
    "comments": [
        "{\"comment\":\"this is a comment\",\"user\":\"e207fee6-7542-4311-8646-d12e1fde3baa\"}"
    ],
    "createdAt": "2023-01-10",
    "updatedAt": "2023-01-10T16:49:49.724Z",
    "user": {
        "id": "5c91874d-e8f2-4119-9a80-8e3d8f23dfee",
        "username": "example",
        "email": "example@gmail.com",
        "fullname": "exam example",
        "createdAt": "2023-01-10T17:32:45.687Z",
        "updatedAt": "2023-01-10T17:32:45.687Z"
    }
}
```
