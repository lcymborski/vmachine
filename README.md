# Vending machine code challenge

## Overview

The application is split into two parts:

- backend (Node.js, Express.js, JavaScript, SQLite)
- frontend (TypeScript, React, Redux/Redux Toolkit)

Sessions are stored in memory storage mocking Redis (redis-mock) and there is no caching on backend.

## How to install

Prerequisites:

- Node.js LTS

Run

```
cd backend
npm install
cd ../frontend
npm install
```

### Configuration

Settings are stored in `.env` file. Copy existing example file to create one:

```
cd backend
cp env.example .env
```

### Running

Backend and frontend have to be run separately.

Run frontend (webpack dev server):

```
cd frontend
npm start
```

Run backend:

```
cd backend
npm start
```

You can access frontend at http://localhost:8080/ and backend at http://localhost:3000/

### API documentation

OpenaAPI 3.0 documentation for the API is generated from them comments in code. It can be found in `backend/openapi.json`

To regenerate it:

```
cd backend
npm run openapi
```

### Testing

Jest and supertest are used for testing. To run tests:

```
cd backend
npm run test
```
