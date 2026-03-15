# GraphQL Server (Node.js + TypeScript + Prisma)

A simple GraphQL backend setup with Node.js, TypeScript, Express, and Prisma.
The project demonstrates a clean backend architecture using GraphQL with modular entities, repositories, and services.

---

## Features

- GraphQL API
- TypeScript support
- Prisma ORM for database access
- Modular entity-based structure
- Authentication with hashed passwords
- Clean separation of concerns (resolvers, repositories, services)

---

## Tech Stack

- Node.js
- TypeScript
- Express
- GraphQL
- Prisma
- PostgreSQL
- bcrypt (for password hashing)

---

## Project Structure

```
src
│
├─ entities
│   ├─ user
│   │   ├─ resolver.ts
│   │   ├─ type-defs.graphql
│   │   └─ index.ts
│
├─ graphql
│   ├─ schema.ts
│   └─ context.ts
│
├─ repositories
│   └─ user.repository.ts
│
├─ services
│
├─ middleware
|   |─ auth.middleware.ts
│
├─ services
│   └─ user.service.ts
|
├─ repositories
│   └─ user.repository.ts
|
├─ types
│   ├─ express.d.ts
│   ├─ graphql-types.ts
│   └─ graphql.d.ts
|
├─ lib
│   └─ prisma.ts
|
├─ utils
│   ├─ password.ts
│   └─ jwt.ts
│
│─ index.ts
└─ app.ts
```

---

## Installation

Clone the repository:

```
git clone <repository-url>
```

Install dependencies:

```
pnpm install
```

---

## Environment Variables

Create a `.env` file in the root directory.

Example:

```
PORT=4000
NODE_ENV=development
DATABASE_URL=your_postgress_database_url
JWT_SECRET=your_secret_key
CLIENT_ORIGIN=http://localhost:3000
```

---

## Prisma Setup

Generate Prisma client:

```
npx prisma generate
```

Run database migrations:

```
pnpm prisma migrate dev "init db setup"
```

---

## Running the Server

Start the development server:

```
pnpm dev
```

GraphQL server will run at:

```
http://localhost:4000/graphql
```

---

## Example Query

```
query {
  users {
    id
    email
    name
  }
}
```

---

## Example Mutation

1. SignUp Mutation
```
mutation SignupUser($input: SignupInput!) {
  signup(input: $input) {
    id
    name
    email
    role
  }
}
```

2. Login Mution
```
mutation LoginUser($input: LoginInput!) {
  login(input: $input) {
    id
    name
    email
    role
  }
}
```
---

## License

This project is for learning purposes.
