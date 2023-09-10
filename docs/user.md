# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body :
```json
{
  "username" : "kiplidev",
  "password" : "kipli123",
  "name" : "kipli"
}
```

Response Body Success :
```json
{
  "data" : {
    "username" : "kiplidev",
    "name" : "kipli"
  }
}
```

Response Body Error :
```json
{
  "errors" : "Username already registered"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body :
```json
{
  "username" : "kiplidev",
  "password" : "kipli123"
}
```

Response Body Success :
```json
{
  "data" : {
    "token" : "unique-token"
  }
}
```

Response Body Error :
```json
{
  {
    "errors" : "Username or password wrong"
  }
}
```

## Update User API

Endpoint : PATCH /api/users/current

Headers :
- Authorization : token

Request Body :
```json
{
  "name" : "kipli", // optional
  "password" : "new-password" // optional
}
```

Response Body Success :
```json
{
  "name" : "kiplidev",
  "name" : "kipli",
}
```

Response body Error :
```json
{
  "errors" : "Name length max 100"
}
```

## GET User API

Endpoint : GET /api/users/current

Headers :
- Authorization : token

Response Body Success :
```json
{
  "data" : {
    "username" : "kiplidev",
    "name" : "kipli"
  }
}
```

Response Body Error :
```json
{
  "errors" : "UnAuthorized"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Headers :
- Authorization : token

Response Body Success :
```json
{
  "data" : "OK"
}
```

Response Body Error :
```json
{
  "errors" : "Unauthorized"
}
```