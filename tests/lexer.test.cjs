const assert = require('node:assert/strict');
const {test} = require('node:test');
require('ts-node/register');
const {Lexer, TokenType} = require('../src/Lexer.ts');

test('lexes a PHP-style variable and numeric literal', () => {
    const tokens = new Lexer().tokenize('$answer 42');
    assert.deepEqual(tokens, [
        {type: TokenType.PHPVariable, value: '$'},
        {type: TokenType.Identifier, value: 'answer'},
        {type: TokenType.Number, value: 42},
    ]);
});

test('reuses lexer without retaining regexp position', () => {
    const lexer = new Lexer();
    assert.deepEqual(lexer.tokenize('hello'), [
        {type: TokenType.Identifier, value: 'hello'},
    ]);
    assert.deepEqual(lexer.tokenize('123'), [
        {type: TokenType.Number, value: 123},
    ]);
});
