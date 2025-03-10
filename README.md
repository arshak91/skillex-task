# skillex-task

## Project setup

```bash

$  npm install

```

### .ENV

```bash
cp .env.example .env

nano .env

PORT=****
DB_HOST=***
DB_PORT=****
DB_USERNAME=****
DB_PASSWORD=****
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run dev

```

## API
```json
/generate, POST

body: {
  "items": [2,1,3],
  "length": 2  // 3, 4 ...
}

response: {
  "id": 1,
  "combination": [
    [A1, B1], [A1, C1], [A1, C2], ...
  ]
}
```
