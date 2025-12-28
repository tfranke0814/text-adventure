# Backend

Quick start

1. Install dependencies

```pwsh
cd backend
npm install
```

2. Run the server

```pwsh
npm start
```

```pwsh
curl -X POST http://localhost:3000/api/broadcast -H "Content-Type: application/json" -d '{"message":"Hello WS clients"}'
```
