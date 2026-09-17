# ABC Bank Fund Transfer Demo

A deliberately simple conference demonstration built with dependency-free Node.js, HTML, CSS and JavaScript.

## Demo accounts

| Account | Name | Starting balance |
|---|---|---:|
| ACC001 | Everyday Account | $1,000 |
| PAY001 | Beneficiary Account | $500 |

The initial implementation intentionally allows a transfer that exceeds the available balance. The automated test suite includes the expected overdraft rule, so one test fails by design and exposes the gap between requirements and implementation.

## Requirements

- Node.js 18 or newer

## Run the application

```bash
npm start
```

Open http://localhost:3000.

## Run the tests

```bash
npm test
```

Expected result: four tests pass and the overdraft validation test fails intentionally.
