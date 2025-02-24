## Setup
Environment
```bash
npm i
```

Run the server
```bash
npm run dev
```

## Use

Get token
```bash
curl -X GET http://localhost:3000/api/token
```
Get Leader board with scores
```bash
curl -X GET http://localhost:3000/api/leaderboard
```

Add new score
```bash
curl -X POST http://localhost:3000/api/score \
     -H "Authorization: Bearer YOUR_TOKEN_HERE" \
     -H "Content-Type: application/json" \
     -d '{"username": "player6", "scoreIncrement": 50}'
```