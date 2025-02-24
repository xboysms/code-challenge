### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
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