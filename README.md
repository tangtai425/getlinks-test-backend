# getlinks-test-backend
getlinks-test-backend

## Getting Started ##

1. Copy `ENV` with `cp .env.example .env`

2. Install package with `yarn`

3. Run `yarn start`

## Unit Test Run ##

1. Run `yarn test:unit`

## Restful API ##

```
-- GET
   |-- /users               (Get all users)
   |-- /users/:id           (Get user by ID)
   
-- POST
   |-- /users               (Create user)
   |-- /users/login         (Login)

-- PUT
   |-- /users/:id           (Update user)

-- DELETE
   |-- /users/:id           (Delete user)

```
