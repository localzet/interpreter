# Interpreter (prototype)

Experimental TypeScript lexer/parser/interpreter. **Not production-ready**: language grammar and parser semantics are still in development. The existing `test.zorin` file is a syntax sketch, not a validated conformance fixture.

## Development

Requires Node.js 22+ for the checked CI matrix.

```sh
npm ci
npm run typecheck
npm test
npm start -- test.zorin
```

The first two checks verify TypeScript compilation and the current lexer behavior. Parsing the syntax sketch may fail until the language grammar is defined and parser regressions are fixed.

Dependencies in `node_modules/` are installed from `package-lock.json` and must not be committed.
